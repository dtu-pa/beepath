export const GRAMMAR_TEST = `The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.
Initially start "a".

(asp): "c" and "d".
(osp): "c" or "d".

After "a" ends, immediately start "e".

After "a" ends, immediately start "e" and start "f".
After "a" ends and "b" ends and (osp) ends, immediately start "e" and start "f" and start (osp).
After either "a" ends or "b" ends or (asp) ends, immediately start "e" and start "f" and start (osp).

After "a" ends and "b" ends, immediately start "e".
After "a" ends and "b" ends and (osp) ends, immediately start "e" and start "f".
After "a" ends and "b" ends and (osp) ends, immediately either start "e" or start "f" or start (asp).

After "a" ends, immediately either start "e" or start "f".
After "a" ends and "b" ends and (osp) ends, immediately either start "e" or start "f" or start (asp).
After either "a" ends or "b" ends or (asp) ends, immediately either start "e" or start "f" or start (asp).

After either "a" ends or "b" ends, immediately start "e".
After either "a" ends or "b" ends or (asp) ends, immediately start "e" and start "f".
After either "a" ends or "b" ends or (asp) ends, immediately either start "e" or start "f".

After "a" ends, eventually start "e".
After "a" ends and "b" ends and (osp) ends, eventually start "e".
After either "a" ends or "b" ends or (asp) ends, eventually start "e".

After "x" ends, the process finishes.`;
