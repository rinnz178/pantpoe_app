import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles/index.css";
import { CButton } from "../../../../layout/CCButton";
import { Divider } from "@mui/material";

const available_langs = [
  {
    code: "en",
    label: "English (United States)",
  },
  {
    code: "my",
    label: "Myanmar (Burmese)",
  },
];

export const LanguageChangeModal = (props) => {
  const { title, subtitle, children, visible, onDismiss } = props;
  const { t, i18n } = useTranslation();

  return (
    <Modal
      open={visible}
      onClose={onDismiss}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        bgcolor="white"
        p={3}
        borderRadius={1}
        width={350}
        mx="auto"
        my="auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ outline: 0 }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box flex={2}>
            <Typography className="modal-header">
              Choose your language
            </Typography>
          </Box>
          <IconButton size="medium">
            <Close onClick={onDismiss} fontSize="24" />
          </IconButton>
        </Box>
        <Box
          pt={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {available_langs.map((lang, i) => {
            const { code, label } = lang;
            const selected = code === i18n.language;
            return (
              <Box
                minWidth="33.3333%"
                maxWidth="35%"
                height={66}
                border={0.5}
                borderRadius={0.5}
                bgcolor={selected ? "#fafafa" : "transparent"}
                borderColor={selected ? "transparent" : "#ddd"}
                p={1}
                px={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={() => i18n.changeLanguage(code)}
              >
                <Typography className="lang-label">{label}</Typography>
              </Box>
            );
          })}
        </Box>
        <Divider  style={{marginTop:"2vh"}}/>

        <CButton
          style={{
            height: "4.5vh",
            fontSize: "1.8vh",
            width: "3vh",
            marginTop: "1vh",
            marginLeft: "35vh"
          }}
          onClick={onDismiss}
        >
          Save
        </CButton>
      </Box>
    </Modal>
  );
};
