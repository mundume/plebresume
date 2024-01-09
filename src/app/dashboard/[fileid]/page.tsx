import React from "react";

type Params = {
  params: {
    fileid: string;
  };
};

const page = ({ params }: Params) => {
  return <div>page</div>;
};

export default page;
