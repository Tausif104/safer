import React from "react";

const SectionTitle = ({ alignment = "left", title, description }) => {
  return (
    <div className="mb-[25px] sm:mb-[30px]" style={{ textAlign: alignment }}>
      <h3 className="text-[28px] mb-[10px]">{title}</h3>
      {description && <p className="text-[16px] sm:text-[18px]">{description}</p>}
    </div>
  );
};

// const FormSectionTitle = ({ title, description, alignment = "center" }) => {
//     return <SectionTitle alignment={alignment} title={title} description={description} />;
//   };

export default SectionTitle;
