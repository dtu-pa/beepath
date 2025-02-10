export const schema = {
  name: "MScGrammar",
  schema: {
    type: "object",
    properties: {
      description: {
        type: "object",
        properties: {
          leadingStatement: {
            type: "string",
            description: "The introductory statement regarding the closed-world assumption.",
          },
          initialStatement: {
            type: "string",
            description: "An initial statement indicating the start of an activity.",
          },
          statementList: {
            type: "array",
            description: "A list of statements, where each statement is of the type: afterStatement, asp, or osp.",
            items: {
              type: "object",
              properties: {
                afterStatement: {
                  type: "array",
                  description: "An array of sentences that start with the 'After' keyword.",
                  items: {
                    type: "object",
                    properties: {
                      postActivityExpression: {
                        type: "string",
                        description:
                          "An expression describing the end of one or more activities, which can occur sequentially, in parallel or in choice relations.",
                      },
                      immediatelyExpression: {
                        type: ["string", "null"],
                        description: "An expression indicating immediate actions.",
                      },
                      eventuallyExpression: {
                        type: ["string", "null"],
                        description: "An expression indicating actions that happen eventually.",
                      },
                    },
                    required: ["postActivityExpression", "immediatelyExpression", "eventuallyExpression"],
                    additionalProperties: false,
                  },
                },
                asp: {
                  type: "array",
                  description:
                    "A list of and-subprocesses containing two or more activities which are groupped through 'AND', where the identifier of the group is used in 'OR' sentences.",
                  items: {
                    type: "object",
                    properties: {
                      aspId: {
                        type: "string",
                        description: "An identifier for AND subprocess.",
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
                },
                osp: {
                  type: "array",
                  description:
                    "A list of or-subprocesses containing two or more activities which are groupped through 'OR', where the identifier of the group is used in 'AND' sentences.",
                  items: {
                    type: "object",
                    properties: {
                      ospId: {
                        type: "string",
                        description: "An identifier for OR subprocess.",
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
              },
              required: ["afterStatement", "asp", "osp"],
              additionalProperties: false,
            },
          },
          closingStatement: {
            type: "string",
            description: "A statement that signifies the end of the process.",
          },
        },
        required: ["leadingStatement", "initialStatement", "statementList", "closingStatement"],
        additionalProperties: false,
      },
    },
    required: ["description"],
    additionalProperties: false,
  },
  strict: true,
};
