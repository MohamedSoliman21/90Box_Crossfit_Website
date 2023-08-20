import express, {Application} from 'express';
import cors from 'cors';
import userRouter from './routes/users';
import careersRouter from './routes/careers';
import contactRouter from './routes/contact';
import programsRouter from './routes/programs';
import scheduleRouter from './routes/schedule';
import teamRouter from './routes/team';
import testimonialRouter from './routes/testimonials';
import botRouter from './routes/chatbot';
import faqRouter from './routes/faq';
import privacyRouter from './routes/privacy';
import termsRouter from './routes/terms';
import { MongoConnect } from './mongoConnection';
import path from 'path';

const app :Application = express();

MongoConnect();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter)
app.use('/careers', careersRouter);
app.use('/contact', contactRouter);
app.use('/programs', programsRouter);
app.use('/schedule', scheduleRouter);
app.use('/team', teamRouter);
app.use('/testimonial', testimonialRouter);
app.use('/bot', botRouter);
app.use('/faq', faqRouter);
app.use('privacy', privacyRouter);
app.use('/terms', termsRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(4000, () => {
  console.log("Run")
})