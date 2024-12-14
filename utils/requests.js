const apiDomain =process.env.NEXT_PUBLIC_API_DOMAIN || null;
//fetch all properties
async function fetchProperties() {
    try {
      if(!apiDomain) {
        return[];
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
      if (!res.ok) {
        throw new Error("Failed to fetch data!");
      }
      return res.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //fetch single property
  async function fetchProperty(id) {
    try {
      if(!apiDomain) {
        return null;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data!");
      }
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  export { fetchProperties,fetchProperty };