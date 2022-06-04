import { Box, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 0;
`
);

export const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box
          py={3}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              &copy; 2022 - Sistema para restaurante
            </Typography>
          </Box>
          <Typography sx={{ pt: { xs: 2, md: 0 } }} variant="subtitle1">
            Realizado por <Link href="#" target="_blank" rel="noopener noreferrer">Santiago Quirumbay</Link>
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
}


