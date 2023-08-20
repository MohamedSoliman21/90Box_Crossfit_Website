"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const testimonialsController_1 = require("../controller/testimonialsController");
const testimonialRouter = express_1.default.Router();
testimonialRouter.get("/", testimonialsController_1.getAllTestimonials);
testimonialRouter.get("/:id", testimonialsController_1.getTestimonialByID);
testimonialRouter.post('/', upload_1.default.single('Image'), testimonialsController_1.AddTestimonial);
testimonialRouter.put('/:id', upload_1.default.single('Image'), testimonialsController_1.UpdateTestimonial);
testimonialRouter.delete('/:id', testimonialsController_1.DeleteTestimonial);
exports.default = testimonialRouter;
