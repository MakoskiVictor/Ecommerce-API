import  React from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function ModifyProfile () {

    const user_login = useSelector((state) => state.user_login);
    const id = user_login.id;
    const history = useHistory();

    const [imageSelected, setImageSelected] = useState("");

    const uploadImage = async () => {
        if(imageSelected.length === 0) {
            return swal({
                title: "No image to send!",
                icon: "error",
                button: "Ok",
              });
        } else {
            const formData = new FormData()
            formData.append("file", imageSelected)
            formData.append("upload_preset", "goctl1il")
    
            await axios.post("https://api.cloudinary.com/v1_1/dzr5xulsx/image/upload", formData)
            .then((response) => 
                axios.put(`http://localhost:3001/users/${id}?type=image`, {
                newImage: response.data.secure_url
                })
                .then(() => {
                    swal({
                      title: "Image changed successfully!",
                      text: "Changes can take a few seconds to see",
                      icon: "success",
                      button: "Ok",
                    }).then(() => {
                      history.push("/profile");
                    })
                  })
            )}
        
        
    };

    return(
        <>
            <h2>Change Image</h2>
            <div>
                <input type="file" onChange={(e)=> {setImageSelected(e.target.files[0])}}/>
                <button onClick={uploadImage}>Upload Image</button>
            </div>
        </>
    )
};