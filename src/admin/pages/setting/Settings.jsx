import "./settings.scss";
import { useEffect, useState } from "react";
import api from "../../api/posts";


const Settings = () => {
  const [content1, setContent1] = useState([]);
  const [content2, setContent2] = useState([]);
  const [content3, setContent3] = useState([]);
  const [content4, setContent4] = useState([]);
  const [content5, setContent5] = useState([]);
  const [content6, setContent6] = useState([]);
  const [content7, setContent7] = useState([]);

  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("settings");
        console.log(response.data);

        setContent1(response.data.address);
        setContent2(response.data.email);
        setContent3(response.data.phone);
        setContent4(response.data.facebook);
        setContent5(response.data.instagram);
        setContent6(response.data.rights);
        setContent7(response.data.home_phone);

        setImage(response.data.image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviousImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviousImage(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("address", content1);
      formData.append("email", content2);
      formData.append("phone", content3);
      formData.append("facebook", content4);
      formData.append("instagram", content5);
      formData.append("rights", content6);
      formData.append("home_phone", content7);
      formData.append("image", image);

      const response = await api.post("settings", formData);

      // if(response) return setTimeout(() => {
      //   window.location.reload()
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adminSettings">
      <h4>Tənzimləmələr</h4>
      <div className="intoSettings">
        <form onSubmit={handleUpload}>
          <div>
            <label>Ünvan *</label>
            <input
              type="text"
              value={content1 || ""}
              onChange={(e) => setContent1(e.target.value)}
            />
          </div>
          <div>
            <label>Elektron ünvan *</label>
            <input
              type="text"
              value={content2 || ""}
              onChange={(e) => setContent2(e.target.value)}
            />
          </div>
          {/* <div>
            <label>Telefon(mobil) *</label>
            <input
              type="number"
              value={content3 || ""}
              onChange={(e) => setContent3(e.target.value)}
            />
          </div> */}
          <div>
            <label>Telefon(ofis) *</label>
            <input
              type="text"
              value={content7 || ""}
              onChange={(e) => setContent7(e.target.value)}
            />
          </div>
          <div>
            <label>Facebook Keçidi *</label>
            <input
              type="text"
              value={content4 || ""}
              onChange={(e) => setContent4(e.target.value)}
            />
          </div>
          <div>
            <label>İnstagram Keçidi*</label>
            <input
              type="text"
              value={content5 || ""}
              onChange={(e) => setContent5(e.target.value)}
            />
          </div>
          <div>
            <label>Hüquqlar *</label>
            <input
              type="text"
              value={content6 || ""}
              onChange={(e) => setContent6(e.target.value)}
            />
          </div>
          <div className="imageFile">
            <div>
              <label>Logo</label>
                <img src={previousImage || image} alt="" />
              <input type="file" accept="image/*" onChange={handleImage} />
            </div>
          </div>
          <button type="submit">Yadda saxla</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
