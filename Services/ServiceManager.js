const ServiceManager = () => {
  const host = "https://avenuecorporation.in/api";

  const emptyPayload = {
    avenuepacks: 0,
    avenuecorporation: 0,
  };

  const getActiveUsers = async () =>
    await fetch(host + "/tracker?action=" + btoa("REQUEST_ACTIVE_USERS"))
      .then((res) => res.text())
      .then((res) => (!res.includes("<") ? JSON.parse(res) : emptyPayload))
      .then((res) =>
        typeof res === "object" && !res.status ? res : emptyPayload
      )
      .catch((err) => {
        console.log("Failed to fetch active users!", err);
      });
  const getAllEnquries = async () => {
    return await fetch(host + "/enquiry?action=" + btoa("GETALL"))
      .then((res) => res.text())
      .then((res) => (!res.includes("<") ? JSON.parse(res) : emptyPayload))
      .then((res) =>
        typeof res === "object" && !res.status ? res : emptyPayload
      )
      .catch((err) => {
        console.log("Failed to fetch all records!", err);
      });
  };

  return {
    getActiveUsers,
    getAllEnquries,
  };
};

export default ServiceManager;
