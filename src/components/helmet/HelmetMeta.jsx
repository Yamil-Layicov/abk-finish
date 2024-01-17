import {Helmet} from 'react-helmet';

const HelmetMeta = ({title, content}) => {
  return (
    <HelmetMeta>
      <meta charSet="utf-8" />
      <title>{title || " "}</title>
      <meta
        name="description"
        content={content || " "}
      />
    </HelmetMeta>
  );
};

export default Helmet;
