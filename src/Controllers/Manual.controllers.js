import manual from "../models/model.manual";

export const createmanual = async (req, res) => {
  const { Name, Area, Folio, ImgUrl } = req.body;

  const newprocedimiento = manual({ Name, Area, Folio, ImgUrl });

  console.log(req.body);

  const manualsave = await newprocedimiento.save();

  res.status(201).json(manualsave);
};
export const getmanuals = async (req, res) => {
  const manuals = await manual.find();

  res.json(manuals);
};
export const getmanualById = async (req, res) => {
  const manuals = await manual.findById(req.params.manualId);
  res.status(200).json(manuals);
};

export const updatemanualById = async (req, res) => {
  const Updatedmanual = await manual.findByIdAndUpdate(
    req.params.manualId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(Updatedmanual);
};
export const deletemanualById = async (req, res) => {
  const { manualId } = req.params;

  await manual.findByIdAndDelete(manualId);

  // code 200 is ok too
  res.status(200).json();
};

export const getmanualbyOCR = async (req, res) => {};
