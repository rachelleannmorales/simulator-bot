const { App } = require('@slack/bolt');
import { getLocationById, getLocations, getTruckIds, startSimulator, stopSimulator } from '../services/truckSimulatorService';
import {customTypeView, form, formModal, startedSuccess, stoppedSuccess} from '../config/truckSimulatorForm'
class SimulatorController {
    private app;
    private startCoordinate: any = null;
    private endCoordinate: any = null;

    constructor(config: any) {
        this.app = new App({
            token: config.SLACK_BOT_TOKEN,
            signingSecret: config.SLACK_SIGNING_SECRET,
            socketMode: true,
            appToken: config.SLACK_APP_TOKEN,
            port: config.PORT || 3000
          });

          this.app.command('/start-simulator', async ({ ack, payload, client }: any) => {
            this.startCoordinate = null;
            this.endCoordinate = null;
            await ack();
            try {
                const result = await client.views.open({
                  trigger_id: payload.trigger_id,
                  view: customTypeView
                });
              }
              catch (error) {
                console.error(error);
              }
        });

        this.app.view('customTypeView', async ({ ack, body, view }: any) => {
            let newForm = {...formModal};
            let blocks = [...newForm.blocks];
            const val = view["state"]["values"]["custom_type"]["customType_action"].selected_options;
            console.log(val);
            val.map((option: any) => {
                blocks = [...blocks, ...form[option.value]]
            })
            newForm.blocks = blocks;
            await ack({
                response_action: 'update',
                view: newForm,
            });
        });

        this.app.view('simulatorView', async ({ ack, body, view, client, logger }: any) => {
            try {
            const truck_id = view["state"]["values"]?.truck_id?.truckId_action?.selected_option.value;
            const speed = view["state"]["values"]?.speed?.speed_action.selected_option.value;

            const profile = view["state"]["values"]?.charging?.charging_action.selected_option.value;

            const reduce_to = view["state"]["values"]?.reduce_to?.reduceTo_action.value;
            const capacitySpeed = view["state"]["values"]?.capacity_speed?.capacitySpeed_action.selected_option.value;

            let data: any = { truck_id };

            if (this.startCoordinate && this.endCoordinate) {
                data.location = {
                    start: this.startCoordinate,
                    end: this.endCoordinate,
                    speed: parseInt(speed)
                }
            }
            if (profile) {
                data.charging = profile;
            }
            if (reduce_to) {
                data.capacity = {
                    reduce_to: parseInt(reduce_to),
                    speed: parseInt(capacitySpeed)
                }
            }

            const result = await startSimulator(data);

            let formSimulationStarted: any = {...startedSuccess};
            if (result.simulation) {
                formSimulationStarted.private_metadata = result.simulation.id;
            }
            console.log(result.simulation);
            await ack({
                response_action: 'update',
                view: formSimulationStarted,
            });
            }
            catch(err) {
                console.log(err);
            }
        });

        this.app.view('simulatorStarted_view', async ({ ack, body, view }: any) => {
            const id = body.view.private_metadata;
            const result = await stopSimulator(id);
            console.log(result);
            await ack({
                response_action: 'update',
                view: stoppedSuccess,
            });
        });


        this.app.options('truckId_action', async ({ body, ack }: any) => {
            const options = await this.populateTruckDropdown(body.value);
            if (options) {
                await ack({
                options: options
                });
            } else {
                await ack();
            }
         });
        
        this.app.options('startLocation_action', async ({ body, ack }: any) => {
            const options = await this.populateLocationDropdown(body.value);
            if (options) {
                await ack({
                options: options
                });
            } else {
                await ack();
            }
         });


         this.app.action('startLocation_action', async ({action, ack, say}: any) => { 
            const start = action.selected_option.value;
            const startLocation = await getLocations(start);
                if (startLocation?.addresses?.length) {
                    const startLocationId = startLocation?.addresses[0].id;
                    const start_coordinates = await getLocationById(startLocationId);
                    this.startCoordinate = start_coordinates?.coordinate;
                }

            await ack();
          })

          this.app.action('endLocation_action', async ({action, ack, say}: any) => { 
            const end = action.selected_option.value;
            const endLocation = await getLocations(end);
                if (endLocation?.addresses?.length) {
                    const endLocationId = endLocation?.addresses[0].id;
                    const end_coordinates = await getLocationById(endLocationId);
                    this.endCoordinate = end_coordinates?.coordinate;
                }
            await ack();
          })

         this.app.options('endLocation_action', async ({ body, ack }: any) => {
            const options = await this.populateLocationDropdown(body.value);
            if (options) {
                await ack({
                options: options
                });
            } else {
                await ack();
            }
         });

         return this.app;
    }

    populateLocationDropdown = async (search: string) => {
        const data = await getLocations(search);
        let options = [];
        if (data?.addresses) {
            for (const result of data?.addresses) {
              options.push({
                text: {
                  type: "plain_text",
                  text: result.address
                },
                value: result.address,
              });
            }
        }

        if (options.length) return options 
        else return false;
    }

    populateTruckDropdown = async (search: string) => {
        const data = await getTruckIds(search);
        let options = [];
        if (data?.trucks) {
            for (const result of data?.trucks) {
              options.push({
                text: {
                  type: "plain_text",
                  text: `${result.name}`
                },
                value: `${result.name}`
              });
            }
        }

        if (options.length) return options 
        else return false;
    }
}

module.exports = SimulatorController;