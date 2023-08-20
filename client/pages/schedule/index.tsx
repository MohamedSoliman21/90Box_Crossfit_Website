import { LanguageDirectionContext } from "@/helpers/langDirection";
import axios from "axios";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

interface Schedule {
  Name: String,
  Image: String
}

const Schedule = () => {
  const [Schedule, setSchedule] = useState<Schedule[]>([]);
  const { isRTL } = useContext(LanguageDirectionContext);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:4000/schedule');
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching Programs:', error);
    }
  };

  return (
    <div className={classNames(`${isRTL ? 'arabic' : 'english'}`, {'text-right': isRTL}, " w-full bg-scheduleBackground bg-cover bg-center py-12 min-h-screen")}>
      <div className="rounded shadow items-center justify-center mx-auto px-4 h-auto">
        <h1 className="text-5xl font-semibold text-center mb-8">
          <FormattedMessage id="footer.schedule" />
        </h1>
        <div className="flex w-full justify-center items-center">
          <img src={`${isRTL? 'http://localhost:4000/' + Schedule[0]?.Image : 'http://localhost:4000/' + Schedule[1]?.Image} `} />
        </div>
      </div>
    </div>
  );
  
};

export default Schedule;
