import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStores = async (req, res) => {
  //finding the records is exist in the db
  if (req.method === "POST") {
    const { id, name, address, postalcode, voting, imgUrl } = req.body;
    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length !== 0) {
          res.json(records);
        } else {
          //create a record on db
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  postalcode,
                  address,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json({ records });
          } else {
            res.status(400);
            res.json({ message: "Id or name is missing" });
          }
        }
      }
    } catch (err) {
      console.error("Erro creating or finding a store", err);
      res.status(500);
      res.json({ message: "Erro creating or finding a store", err });
    }
  }
};
export default createCoffeeStores;
