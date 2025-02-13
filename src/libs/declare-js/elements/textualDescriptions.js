import { ExistenceConstraint } from "./existenceConstraint.js";
import { RelationConstraint } from "./relationConstraint.js";

export function getTextualDescription(constraint) {
    if (constraint instanceof ExistenceConstraint) {
        let activityA = constraint.activityA;

        const templateToPrefix = {
            "AtLeast": "at least",
            "AtMost": "at most",
            "Exactly": "exactly"
        };

        const templateToCardinality = {
            "One": "once",
            "Two": "twice",
            "Three": "three times"
        };

        let prefix = "";
        let cardinality = "";

        for (let key in templateToPrefix) {
            if (constraint.template.startsWith(key)) {
                prefix = templateToPrefix[key];
                let cardinalityKey = constraint.template.replace(key, "");
                cardinality = templateToCardinality[cardinalityKey];
                break;
            }
        }

        switch (constraint.template) {
            case 'Init':
                return `Each trace must start with '${activityA}'.`;
            case 'End':
                return `Each trace must end with '${activityA}'.`;
            case 'Absence':
                return `Each trace must not contain '${activityA}'.`;
            case 'AtLeastOne':
            case 'AtLeastTwo':
            case 'AtLeastThree':
            case 'AtMostOne':
            case 'AtMostTwo':
            case 'AtMostThree':
            case 'ExactlyOne':
            case 'ExactlyTwo':
            case 'ExactlyThree':
                return `Each trace must contain '${activityA}' ${prefix} ${cardinality} .`;
            default:
                console.log("Error: " + constraint);
                break;
        }
    }

    else if (constraint instanceof RelationConstraint) {
        let activityA = constraint.activityA;
        let activityB = constraint.activityB;

        let negation = "";

        let constraintTemplate = constraint.template;

        if (constraint.isNegation && constraintTemplate.startsWith("Not")) {
            negation = "never "
            constraintTemplate = constraintTemplate.substring(3);
        }

        switch (constraintTemplate) {
            case 'RespondedExistence':
                return `If '${activityA}' occurs, '${activityB}' must also occur somewhere.`;
            case 'NotRespondedExistence':
                return `If '${activityA}' occurs, '${activityB}' must not occur anywhere.`;

            case 'Response':
                return `If '${activityA}' occurs, it must ${negation}eventually be followed by '${activityB}'.`;
            case 'AlternateResponse':
                return `If '${activityA}' occurs, it must ${negation}eventually be followed by '${activityB}', with no other '${activityA}' in between.`;
            case 'ChainResponse':
                return `If '${activityA}' occurs, it must ${negation}immediately be followed by '${activityB}'.`;

            case 'Precedence':
                return `If '${activityA}' occurs, it must ${negation}eventually be preceded by '${activityB}'.`;
            case 'AlternatePrecedence':
                return `If '${activityA}' occurs, it must ${negation}eventually be preceded by '${activityB}', with no other '${activityA}' in between.`;
            case 'ChainPrecedence':
                return `If '${activityA}' occurs, it must ${negation}immediately be preceded by '${activityB}'.`;

            case 'CoExistence':
                return `If '${activityA}' occurs, '${activityB}' must also occur somewhere. If '${activityB}' occurs, '${activityA}' must also occur somewhere.`;
            case 'NotCoExistence':
                return `If '${activityA}' occurs, '${activityB}' must not occur anywhere. If '${activityB}' occurs, '${activityA}' must also not occur anywhere.`;


            case 'Succession':
                return `If '${activityA}' occurs, it must ${negation}eventually be followed by '${activityB}' and if '${activityB}' occurs, it must ${negation}eventually be preceded by '${activityA}'.`;
            case 'AlternateSuccession':
                return `If '${activityA}' occurs, it must ${negation}eventually be followed by '${activityB}', with no other '${activityA}' in between and if '${activityB}' occurs, it must ${negation}eventually be preceded by '${activityA}', with no other '${activityB}' in between.`;
            case 'ChainSuccession':
                return `If '${activityA}' occurs, it must ${negation}immediately be followed by '${activityB}' and if '${activityB}' occurs, it must ${negation}immediately be preceded by '${activityA}'.`;

            default:
                console.log("Error: " + constraint);
                break;
        }
    }
}