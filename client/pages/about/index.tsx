import { LanguageDirectionContext } from "@/helpers/langDirection";
import { useContext } from "react";

const about = () => {
  const { isRTL } = useContext(LanguageDirectionContext);

    return (  
        <div className={`w-full min-h-screen mx-auto py-8 bg-primary text-white px-4 ${isRTL? "arabic" : "english"}`}>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            eget odio vel mi convallis tristique sed id elit. Proin faucibus
            euismod augue, at suscipit enim scelerisque vitae. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            Curae; Fusce scelerisque urna ipsum, et venenatis lacus semper at.
          </p>
          <p className="text-lg mb-6">
            Phasellus ultrices sollicitudin justo, eget gravida sapien
            scelerisque at. Nam nec tellus nec tortor tincidunt feugiat. Fusce
            at posuere massa. Nullam interdum hendrerit erat, at laoreet mi
            pharetra nec. Nam faucibus a erat vel ornare.
          </p>
        </div>
        <div className="md:w-1/2">

        </div>
      </div>
    </div>
    );
}
 
export default about;