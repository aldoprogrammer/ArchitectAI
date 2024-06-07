import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { Button, Typography } from '@material-tailwind/react';

const MarkdownEditor = () => {
  const [value, setValue] = useState("");

  const generateRandomDocumentation = () => {
    const documentation = `
# 3D Project Documentation

## Introduction
This documentation outlines the development process and key features of our 3D project.

## Project Overview
Our project aims to create a virtual 3D environment for immersive experiences.

## Features
- **Realistic Rendering**: Utilizes advanced rendering techniques for lifelike visuals.
- **Interactivity**: Allows users to interact with objects within the environment.
- **Customization**: Provides options for users to customize their experience.

## Development Timeline
1. **Planning Phase**: Define project scope and requirements.
2. **Design Phase**: Create wireframes and mockups.
3. **Development Phase**: Implement core functionalities.
4. **Testing Phase**: Conduct thorough testing for performance and usability.
5. **Deployment**: Release the project to production.

## Technologies Used
- **Unity**: Main engine for building the 3D environment.
- **Blender**: Used for modeling and animation.
- **JavaScript**: Programming language for scripting interactions.
- **React**: Frontend framework for user interface.

## Conclusion
Our 3D project aims to push the boundaries of virtual reality and create engaging experiences for users.

`;

    // Animate text generation per character
    let currentIndex = 0;
    localStorage.setItem('generatedDocumentation', documentation);
    const interval = setInterval(() => {
      if (currentIndex <= documentation.length) {
        setValue(documentation.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        
      }
    }, 50); // Adjust animation speed (milliseconds per character)
  };

  return (
    <div>
      <div className='flex flex-row gap-3 mb-3'>
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Project Documents
        </Typography>
        <Button
          color="blue"
          size="lg"
          className="transition transform hover:translate-y-[-3px] hover:bg-blue-700  h-10 text-center justify-center items-center flex py-5"
          onClick={generateRandomDocumentation}
        >
          Generate AI
        </Button>
      </div>
      <div className="mb-6">
        <MDEditor
          value={value}
          onChange={setValue}
          height={400}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
