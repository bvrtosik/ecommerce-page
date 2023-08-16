import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const HomeImage = styled.img`
  max-width: 100%;
  max-height: 500px;
`;

const HomeImageWrapper = styled.div`
  text-align: center;
`;

const ImageGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
  justify-content: center;
  item-align: center;
`;

const ImageBox = styled.div`
  ${(props) =>
    props.active
      ? `
border-color: black;`
      : `
border-color: transparent;
opacity: .7; `}
  border: 2px solid black;
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <HomeImageWrapper>
        <HomeImage src={activeImage} />
      </HomeImageWrapper>
      <ImageGrid>
        {images.map((image) => (
          <ImageBox
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageBox>
        ))}
      </ImageGrid>
    </>
  );
}
