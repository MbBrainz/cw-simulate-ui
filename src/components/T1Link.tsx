import { Link as MuiLink } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import { Link as RouterLink, To } from 'react-router-dom';

export interface IT1LinkProps extends PropsWithChildren {
  to: To;
  title?: string;
  target?: HTMLAttributeAnchorTarget;
  sx?: SxProps<Theme>;
}
export default function T1Link(props: IT1LinkProps) {
  const {
    to,
    sx,
    ...rest
  } = props;
  
  if (isExternal(to)) {
    return <ExternalLink href={to} sx={sx} {...rest} />
  }
  else {
    return <InternalLink to={to} sx={sx} {...rest} />
  }
}

const COMMON_STYLE: SxProps<Theme> = {
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
};
const ExternalLink = styled(MuiLink)(() => COMMON_STYLE);
const InternalLink = styled(RouterLink)(() => COMMON_STYLE);

const isExternal = (to: To): to is string => typeof to === 'string' && !!to.match(/^([A-Za-z0-9]+:)?\/\//)
