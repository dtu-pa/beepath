export const EXAMPLE_NL_TEXT_CONVERTED = `The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.

Initially start "receive order".

After "receive order" ends, immediately start "pick items" and start "send invoice".
After "pick items" ends and "send invoice" ends, immediately start "close order".

After "close order" ends, the process finishes.`;
