import express, { Response, Request } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];

      const newHotel: HotelType = req.body;

      // upload images to cloudinary
      const imageUrls = await uploadImages(imageFiles);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // if upload was successful, add the urls to new hotel
      const hotel = new Hotel(newHotel);

      // save the new hotel in our db
      hotel.save();

      res.status(201).json({
        message: "Hotel created",
        hotel,
      });
    } catch (error) {
      console.log("Error creating hotel: ", error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    res.status(200).json({
      hotels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching hotels",
    });
  }
});

// Get a single hotel
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id.toString();
    const hotel = await Hotel.findOne({ _id: hotelId, userId: req.userId });

    res.status(200).json({
      hotel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching particular hotel");
  }
});

// Update a particular hotel
router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotelId = req.params.id.toString();

      const hotel = await Hotel.findByIdAndUpdate(
        {
          _id: hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({
          message: "Hotel not found",
        });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);
      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];
      await hotel.save();

      res.status(201).json({
        hotel,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Error updating hotel");
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
