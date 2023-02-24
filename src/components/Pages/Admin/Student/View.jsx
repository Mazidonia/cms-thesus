import styled from "@emotion/styled";
import { getCss } from "libs/styles";
import { Grid } from "@mui/material/";

const SContainer = styled.div`
  margin-left: 44px;
`;

const STitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${getCss("cTextContent")};
  word-wrap: break-word;
`;

const SDetail = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${getCss("cTextContent")};
  word-wrap: break-word;
`;

function View({ row }) {
  return (
    <SContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <STitle>ส่งเล่ม 3 บท</STitle>
          <SDetail>{`${
            row?.student_send_thesis_defend_complete || "-"
          } `}</SDetail>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <STitle>สามารถสอบ 5 บทได้ตั้งแต่</STitle>
          <SDetail>{`${row?.student_thesis_oral_can_be_date || "-"}`}</SDetail>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <STitle>ตีพิมพ์เผยแพร่ผลงานทางวิชาการ</STitle>
          <SDetail>{`${row?.student_publish_note || "-"}`}</SDetail>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <STitle>สำเร็จการศึกษา ในการประชุมครั้งที่</STitle>
          <SDetail>
            {`${row?.student_graduate_prefix || "-"}  ${
              row?.student_graduate || "-"
            }`}
          </SDetail>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <STitle>นำเข้าสภาวิชาการ ในการประชุมครั้งที่</STitle>
          <SDetail>{`${row?.student_board_academic_prefix || "-"}  ${
            row?.student_board_academic || "-"
          }`}</SDetail>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <STitle>นำเข้าสภามหาวิทยาลัย ในการประชุมครั้งที่</STitle>
          <SDetail>{`${row?.student_approve_degree_prefix || "-"}  ${
            row?.student_approve_degree || "-"
          }`}</SDetail>
        </Grid>
      </Grid>
    </SContainer>
  );
}

export default View;
