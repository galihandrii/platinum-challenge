import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';

function DropZone() {
  const [files, setFiles] = useState([]);
  console.log(files);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const style = {
    borderColor: '#6c757d',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    borderWidth: 2,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    transition: 'border .2s ease-in-out'
  };

  return (
    <div {...getRootProps()} className="dropzone" style={style}>
      <input {...getInputProps()} />
      {isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag and drop your files here, or click to select files</p>
      }
      {files.map(file => (
        <img
          key={file.name}
          src={file.preview}
          alt={file.name}
          style={{height: 100, margin: 10}}
        />
      ))}
    </div>
  );
}

export default DropZone;
