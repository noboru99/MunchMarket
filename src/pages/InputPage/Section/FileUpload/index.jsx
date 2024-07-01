import "./style.scss";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { useState } from "react";

const FileUpload = ({ name, setValue }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setValue(name, file);
    setSelectedFile(file);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>클릭하여 이미지를 추가하기</p>
            </div>
          </section>
        )}
      </Dropzone>

      {selectedFile && (
        <div>
          <p>{selectedFile.name}</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt={selectedFile.name}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default FileUpload;
