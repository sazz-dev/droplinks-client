export const locationLoader = async () => {
  const [districtRes, upazilaRes] = await Promise.all([
    fetch("/districts.json"),
    fetch("/upazilas.json"),
  ]);

  if (!districtRes.ok || !upazilaRes.ok) {
    throw new Response("Failed to load locations", { status: 500 });
  }

  return {
    districts: await districtRes.json(),
    upazilas: await upazilaRes.json(),
  };
};
