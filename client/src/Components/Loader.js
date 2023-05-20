import { ColorRing } from "react-loader-spinner";

const Loader = ({attributes}) => {
  
  if(attributes){
    const {height,width,color} = attributes

    return (
      <ColorRing
        visible={true}
        height={height ?? '15'}
        width={width ?? '15'}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={[color,color,color,color,color]}
      />
    );
  }

  return (
    <ColorRing
      visible={true}
      height='15'
      width='15'
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#fff',"#fff","#fff","#fff","#fff"]}
    />
  );
  

};

export default Loader;
