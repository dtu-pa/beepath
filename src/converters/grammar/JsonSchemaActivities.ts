export const schema = {
  name: "MScGrammar",
  schema: {
    type: "object",
    properties: {
      leadingStatement: {
        type: "string",
        description: "The introductory statement regarding the closed-world assumption.",
      },
      initialStatement: {
        type: "object",
        properties: {
          activity: {
            type: "string",
            description: "The activity started in the initial statement when the process starts.",
          },
        },
        required: ["activity"],
        additionalProperties: false,
      },
      statementList: {
        type: "array",
        description: "A list of statements, where each statement is of the type: afterStatement, asp, or osp.",
        items: {
          type: "object",
          properties: {
            afterStatement: {
              type: ["object", "null"],
              properties: {
                postActivityExpression: {
                  type: "object",
                  description:
                    "An expression describing the end of one or more activities, which can occur sequentially, in parallel or in choice relations.",
                  properties: {
                    sequencePostActivityExpression: {
                      type: ["object", "null"],
                      properties: {
                        activity: {
                          type: "string",
                          description: "The activity that ends.",
                        },
                      },
                      required: ["activity"],
                      additionalProperties: false,
                    },
                    andPostActivityExpression: {
                      type: ["object", "null"],
                      properties: {
                        activityOrOspId: {
                          type: "array",
                          description: "List of activities or identifiers for or-subprocesses which all end.",
                          items: {
                            type: "string",
                            description: "Activity or or-subprocess identifier.",
                          },
                        },
                      },
                      required: ["activityOrOspId"],
                      additionalProperties: false,
                    },
                    orPostActivityExpression: {
                      type: ["object", "null"],
                      properties: {
                        activityOrAspId: {
                          type: "array",
                          description:
                            "List of activities or identifiers for and-subprocesses from which only one has to end.",
                          items: {
                            type: "string",
                            description: "Activity or and-subprocess identifier.",
                          },
                        },
                      },
                      required: ["activityOrAspId"],
                      additionalProperties: false,
                    },
                  },
                  required: ["sequencePostActivityExpression", "andPostActivityExpression", "orPostActivityExpression"],
                  additionalProperties: false,
                },
                immediatelyExpression: {
                  type: ["object", "null"],
                  description: "One or more activities that start immediately.",
                  properties: {
                    sequencePreActivityExpression: {
                      type: ["object", "null"],
                      properties: {
                        activity: {
                          type: "string",
                          description: "The activity that starts.",
                        },
                      },
                      required: ["activity"],
                      additionalProperties: false,
                    },
                    andPreActivityExpression: {
                      type: ["object", "null"],
                      properties: {
                        activityOrOspId: {
                          type: "array",
                          description: "List of activities or identifiers for or-subprocesses which all start.",
                          items: {
                            type: "string",
                            description: "Activity or or-subprocess identifier.",
                          },
                        },
                      },
                      required: ["activityOrOspId"],
                      additionalProperties: false,
                    },
                    orPreActivityExpression: {
                      type: ["object", "null"],
                      properties: {
                        activityOrAspId: {
                          type: "array",
                          description:
                            "List of activities or identifiers for and-subprocesses from which only one starts.",
                          items: {
                            type: "string",
                            description: "Activity or and-subprocess identifier.",
                          },
                        },
                      },
                      required: ["activityOrAspId"],
                      additionalProperties: false,
                    },
                    repeatSincePreActivityExpression: {
                      type: ["object", "null"],
                      properties: {
                        repeatSinceActivity: {
                          type: "string",
                          description: "The activity which previously ended and starts again.",
                        },
                        activityOrAspId: {
                          type: "array",
                          description:
                            "List of activities or identifiers for and-subprocesses from which only one starts.",
                          items: {
                            type: "string",
                            description: "Activity or and-subprocess identifier.",
                          },
                        },
                      },
                      required: ["repeatSinceActivity", "activityOrAspId"],
                      additionalProperties: false,
                    },
                  },
                  required: [
                    "sequencePreActivityExpression",
                    "andPreActivityExpression",
                    "orPreActivityExpression",
                    "repeatSincePreActivityExpression",
                  ],
                  additionalProperties: false,
                },
                eventuallyExpression: {
                  type: ["object", "null"],
                  description: "An activity that happens eventually.",
                  properties: {
                    activity: {
                      type: "string",
                      description: "The activity which eventually starts.",
                    },
                  },
                  required: ["activity"],
                  additionalProperties: false,
                },
              },
              required: ["postActivityExpression", "immediatelyExpression", "eventuallyExpression"],
              additionalProperties: false,
            },
            asp: {
              type: ["object", "null"],
              properties: {
                aspId: {
                  type: "string",
                  description: "An identifier for the AND subprocess.",
                },
                activities: {
                  type: "array",
                  description: "List of activities in the AND subprocess.",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["aspId", "activities"],
              additionalProperties: false,
            },
            osp: {
              type: ["object", "null"],
              properties: {
                ospId: {
                  type: "string",
                  description: "An identifier for the OR subprocess.",
                },
                activities: {
                  type: "array",
                  description: "List of activities in the OR subprocess.",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["ospId", "activities"],
              additionalProperties: false,
            },
          },
          required: ["afterStatement", "asp", "osp"],
          additionalProperties: false,
        },
      },
      closingStatement: {
        type: "object",
        properties: {
          activity: {
            type: "string",
            description: "The activity which ends in the closing statement when the process finishes.",
          },
        },
        required: ["activity"],
        additionalProperties: false,
      },
    },
    required: ["leadingStatement", "initialStatement", "statementList", "closingStatement"],
    additionalProperties: false,
  },
  strict: true,
};
