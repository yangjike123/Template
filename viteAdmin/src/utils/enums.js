export function namespace(keys, additional) {
  return {
    Name: keys,
    RSetState: "RSetState",
    RAdd: "RAdd",
    EGet: "EGet",
    EPost: "EPost",
    EDelete: "EDelete",
    EPut: "EPut",
    ...additional,
  };
}
