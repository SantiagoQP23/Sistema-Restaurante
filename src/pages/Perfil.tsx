

import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  Divider,
  Container
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { useAppSelector } from '../hooks/useRedux';
import { selectAuth } from '../reducers';
import { CardHeader } from '@mui/material';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import { Footer } from '../components/ui';


const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);


export const Perfil = () => {

  const { usuario } = useAppSelector(selectAuth);
  const theme = useTheme();


  return (
    <>

      <Container sx={{ mt: 3 }} maxWidth="lg">

        <CardCover>
          <CardMedia image={'https://img.freepik.com/vector-gratis/fondo-abstracto-azul-formas-geometricas_1017-15490.jpg?w=2000'} />
          <CardCoverAction>
            <Input
              accept="image/*"
              id="change-cover" multiple type="file" />
            <label htmlFor="change-cover">
              <Button
                startIcon={<UploadTwoToneIcon />}
                variant="contained"
                component="span"
              >
                Change cover
              </Button>
            </label>
          </CardCoverAction>
        </CardCover>
        <AvatarWrapper>
          <Avatar variant="rounded" alt={usuario!.nombres} src={'https://tokyo-free-black.bloomui.com/static/images/avatars/4.jpg'} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
        <Box py={2} pl={2} mb={3}>
          <Typography gutterBottom variant="h4">
            {usuario!.nombres}
          </Typography>
          <Typography variant="subtitle2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, hic?
            { }</Typography>
          <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
            {usuario?.cargo.nombreCargo} | San Pablo | 1314 followers
          </Typography>
          <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Button size="small" variant="contained">
                Follow
              </Button>
              <Button size="small" sx={{ mx: 1 }} variant="outlined">
                View website
              </Button>
              <IconButton color="primary" sx={{ p: 0.5 }}>
                <MoreHorizTwoToneIcon />
              </IconButton>
            </Box>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              size="small"
              variant="text"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              See all {' '}
              1324
              {' '}
              connections
            </Button>
          </Box>
        </Box>


        <Card>
          <CardHeader title="Recent Activity" />
          <Divider />
          <Box px={2} py={4} display="flex" alignItems="flex-start">
            <AvatarPrimary>
              <ShoppingBagTwoToneIcon />
            </AvatarPrimary>
            <Box pl={2} flex={1}>
              <Typography variant="h3">Orders</Typography>

              <Box pt={2} display="flex">
                <Box pr={8}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                  >
                    Total
                  </Typography>
                  <Typography variant="h2">485</Typography>
                </Box>
                <Box>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                  >
                    Failed
                  </Typography>
                  <Typography variant="h2">8</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <CardHeader />
        </Card>
      </Container>

      <Footer />
    </>
  )
}
