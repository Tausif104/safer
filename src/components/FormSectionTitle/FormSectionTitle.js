import React, { Fragment } from "react";

const SectionTitle = ({ alignment = "left", title, description }) => {
  return (
    <div className='mb-[25px] sm:mb-[30px]' style={{ textAlign: alignment }}>
      <h3 className='text-[28px] mb-[10px]'>
        {title.split("\n").map((t, i) => (
          <Fragment key={i}>
            {t}
            <br />
          </Fragment>
        ))}
      </h3>
      {description && (
        <p className='text-[16px] sm:text-[18px]'>{description}</p>
      )}
    </div>
  );
};

// const FormSectionTitle = ({ title, description, alignment = "center" }) => {
//     return <SectionTitle alignment={alignment} title={title} description={description} />;
//   };

export default SectionTitle;
