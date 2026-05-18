const ROLES = {
  CREATOR: ["PHBuilderman"],
  SCRIPTERS: ["AxoStuff", "Leaf"],
  UI_DESIGNERS: ["Niko Newtron", "PHBuilderman"],
  TESTERS: ["AxoStuff"]
};

function getUserRole(username) {
  for (const role in ROLES) {
    if (ROLES[role].includes(username)) return role;
  }
  return "USER";
}

function canEditWiki(username) {
  const role = getUserRole(username);
  return ["CREATOR", "SCRIPTERS"].includes(role);
}

function canEditUI(username) {
  const role = getUserRole(username);
  return ["CREATOR", "UI_DESIGNERS"].includes(role);
}

function isTester(username) {
  return getUserRole(username) === "TESTERS";
}
