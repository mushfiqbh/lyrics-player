import catalogModel from "../models/catalogModel.js";

const createCatalog = async (req, res) => {
  const newCatalog = new catalogModel({
    pathname: req.body.pathname,
    title: req.body.title,
    label: req.body.label,
    desc: req.body.desc,
    related: req.body.related,
    reviewer: req.body.reviewer,
    faqs: req.body.faqs,
    keyterms: req.body.keyterms,
    date: req.body.date,
  });

  try {
    await newCatalog.save();
    res.json({ success: true, message: "Catalog Created" });
  } catch (error) {
    res.json({ succes: false, message: "Error Creating Catalog" });
  }
};

const updateCatalog = async (req, res) => {
  const { id } = req.params;

  try {
    const catalog = await catalogModel.findById(id);
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    await catalogModel.findByIdAndUpdate(id, req.body);
    const updatedCatalog = await catalogModel.findById(id);

    res.status(200).json({ message: "Catalog Updated", data: updateCatalog });
  } catch (error) {
    res.status(500).json({ message: "Error updating catalog", error });
  }
};

const getCatalog = async (req, res) => {
  try {
    const catalogs = await catalogModel.find({});
    res.json({ success: true, data: catalogs });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

const deleteCatalog = async (req, res) => {
  const { id } = req.params;

  try {
    const catalog = await catalogModel.findById(id);
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    await catalogModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Catalog Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Catalog", error });
  }
};

export { createCatalog, updateCatalog, getCatalog, deleteCatalog };
