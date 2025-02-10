export const EXAMPLE_ONE = `The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.
Initially start "examine female patient".

(patient needs examination): "order examination with follow up treatment" and "fill out request form".
(prescribe treatment): "conduct follow up treatment" and "diagnose with prescribe therapy".

After "examine female patient" ends, immediately either start "fill out examination form" or start (patient needs examination).

After "order examination with follow up treatment" ends and "fill out request form" ends, immediately start "inform patient about risks".
After "inform patient about risks" ends, immediately either start "sign consent" or start "deny consent".

After "sign consent" ends, immediately start "arrange appointment".
After "arrange appointment" ends, immediately start "update HIS selecting".
After "update HIS selecting" ends, eventually start "prepare sampling".
After "prepare sampling" ends, eventually start "take sample".
After "take sample" ends, immediately start "send sample to lab" and start "conduct follow up treatment".
After "send sample to lab" ends, immediately start "validate sample".
After "validate sample" ends, immediately repeat since "arrange appointment" or start "perform analysis".
After "perform analysis" ends, immediately start "validate results".
After "validate results" ends, immediately start "diagnose with prescribe therapy".

After either (prescribe treatment) ends or "deny consent" ends or "fill out examination form" ends, the process finishes.`;
