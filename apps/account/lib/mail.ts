import { Resend } from "resend";

const HOST = process.env.HOST;
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${HOST}/new-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: "no-replay@trivialcoding.com",
    to: email,
    subject: "비밀번호를 재설정을 완료해주세요.",
    html: `<p><a href="${confirmLink}">여기</a>를 클릭하여 비밀번호 재설정을 완료해주세요. </p>`,
  });

  if (error) {
    throw new Error("메일 발송에 실패하였습니다.");
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${HOST}/new-verification?token=${token}`;

  const { error } = await resend.emails.send({
    from: "no-replay@trivialcoding.com",
    to: email,
    subject: "회원가입을 완료해주세요.",
    html: `<p><a href="${confirmLink}">여기</a>를 클릭하여 회원가입을 완료해주세요.</p>`,
  });

  if (error) {
    throw new Error("메일 발송에 실패하였습니다.");
  }
};
