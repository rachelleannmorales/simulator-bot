export const customTypeView = {
    "type": "modal",
    "callback_id": 'customTypeView',
	"title": {
		"type": "plain_text",
		"text": "CAFU Truck Simulation",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Next",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
    "blocks": [
        {
            "type": "input",
			"block_id": "custom_type",
			"label": {
				"type": "plain_text",
				"text": "Pick a Simulation from the list"
			},
			"element": {
				"type": "checkboxes",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Location",
							"emoji": true
						},
						"value": "location"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Charging",
							"emoji": true
						},
						"value": "charging"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Capacity",
							"emoji": true
						},
						"value": "capacity"
					}
				],
				"action_id": "customType_action"
			}
		}
    ]
}

export const formModal = {
    "type": "modal",
    "callback_id": 'simulatorView',
    "title": {
        "type": "plain_text",
        "text": "CAFU Truck Simulation",
        "emoji": true
    },
    "submit": {
        "type": "plain_text",
        "text": "Submit",
        "emoji": true
    },
    "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
    },
    "blocks": [
        {
            "type": "input",
            "block_id": "truck_id",
            "label": {
                "type": "plain_text",
                "text": "Select a Truck from the dropdown menu"
            },
            "element": {
                "action_id": "truckId_action",
                "type": "external_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item"
                },
                "min_query_length": 0
            }
        },
    ]
};

export const form: any = {
    location: [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "Type: Location",
                "emoji": true
            }
        },
            {
                "type": "input",
                "dispatch_action": true,
                "block_id": "start_coordinate",
                "label": {
                    "type": "plain_text",
                    "text": "Location Start Point"
                },
                "element": {
                    "action_id": "startLocation_action",
                    "type": "external_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select location"
                    },
                    "min_query_length": 3
                }
            },
            {
                "type": "input",
                "dispatch_action": true,
                "block_id": "end_coordinate",
                "label": {
                    "type": "plain_text",
                    "text": "Location End Point"
                },
                "element": {
                    "action_id": "endLocation_action",
                    "type": "external_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select location"
                    },
                    "min_query_length": 3
                }
            },
            {
                "type": "input",
                "block_id": "speed",
                "label": {
                    "type": "plain_text",
                    "text": "Location Sim Speed"
                },
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select speed",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "1x"
                            },
                            "value": "1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "2x"
                            },
                            "value": "2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "8x"
                            },
                            "value": "8"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "12x"
                            },
                            "value": "12"
                        }
                    ],
                    "action_id": "speed_action"
                }
            }
        ],
    charging: [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Type: Charging",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "charging",
                "label": {
                    "type": "plain_text",
                    "text": "Select a Charging Profile"
                },
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Charge from 49% -> 50%",
                                "emoji": true
                            },
                            "value": "profile_A"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Charge from 0% -> 52%",
                                "emoji": true
                            },
                            "value": "profile_B"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Charge from 47% -> 92%",
                                "emoji": true
                            },
                            "value": "profile_C"
                        }
                    ],
                    "action_id": "charging_action"
                }
            }
        ],
    capacity: [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Type: Capacity",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "reduce_to",
                "element": {
                    "type": "number_input",
                    "is_decimal_allowed": false,
                    "action_id": "reduceTo_action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "% Change in Capacity",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "capacity_speed",
                "label": {
                    "type": "plain_text",
                    "text": "Capacity change Speed"
                },
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "1x"
                            },
                            "value": "1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "2x"
                            },
                            "value": "2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "8x"
                            },
                            "value": "8"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "12x"
                            },
                            "value": "12"
                        }
                    ],
                    "action_id": "capacitySpeed_action"
                }
            }
        ]
}

export const startedSuccess = {
	"type": "modal",
    "callback_id": "simulatorStarted_view",
	"title": {
		"type": "plain_text",
		"text": "CAFU Truck Simulation",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Close",
		"emoji": true
	},
    "submit": {
        type: "plain_text",
        text: "Stop Simulator",
        emoji: true
    },
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Simulation started successfully :tada:",
				"emoji": true
			}
		}
	]
}


export const stoppedSuccess = {
	"type": "modal",
    "callback_id": "simulatorStopped_view",
	"title": {
		"type": "plain_text",
		"text": "CAFU Truck Simulation",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Okay",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Simulation stopped successfully :tada:",
				"emoji": true
			}
		}
	]
}


export default { form, formModal, startedSuccess, stoppedSuccess };