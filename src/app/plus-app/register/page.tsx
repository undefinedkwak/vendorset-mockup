"use client";
import { useState } from "react";
import { UserPlus, Building2, CheckCircle, X } from "lucide-react";

export default function RegisterPage() {
  const [invCode, setInvCode] = useState("");
  const [vcCode, setVcCode] = useState("");
  const [invResult, setInvResult] = useState<"idle" | "success" | "error">("idle");
  const [vcResult, setVcResult] = useState<"idle" | "success" | "error">("idle");
  const [invFocused, setInvFocused] = useState(false);
  const [vcFocused, setVcFocused] = useState(false);

  return (
    <div className="px-5 py-6 space-y-0">
      {/* Section 1: 벤더 기사 등록 */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#E7F2FE" }}
          >
            <UserPlus className="h-[18px] w-[18px]" style={{ color: "#0D6DD8" }} />
          </div>
          <div>
            <p className="text-[16px] font-bold" style={{ color: "#121417" }}>
              벤더 기사 등록
            </p>
            <p className="text-[13px]" style={{ color: "rgba(18,20,23,0.60)" }}>
              초대 코드를 입력하여 벤더에 가입합니다
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* VDS TextField XLarge */}
          <div className="relative">
            <input
              type="text"
              placeholder="INV-XXXXXX"
              value={invCode}
              onChange={(e) => {
                setInvCode(e.target.value);
                setInvResult("idle");
              }}
              onFocus={() => setInvFocused(true)}
              onBlur={() => setInvFocused(false)}
              className="w-full h-14 px-4 text-[16px] rounded-xl outline-none transition-all"
              style={{
                border: `1.5px solid ${
                  invResult === "error"
                    ? "#E0433E"
                    : invFocused
                    ? "#0D6DD8"
                    : "rgba(18,20,23,0.15)"
                }`,
                color: "#121417",
                backgroundColor: "#FFFFFF",
              }}
            />
            {invCode && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(18,20,23,0.10)" }}
                onClick={() => setInvCode("")}
              >
                <X className="h-3 w-3" style={{ color: "rgba(18,20,23,0.60)" }} />
              </button>
            )}
          </div>

          {invResult === "success" && (
            <div
              className="rounded-xl p-3.5 flex items-start gap-2.5"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#3EB21F" }} />
              <div>
                <p className="text-[14px] font-medium" style={{ color: "#121417" }}>
                  가입 요청이 접수되었습니다
                </p>
                <p className="text-[13px] mt-0.5" style={{ color: "rgba(18,20,23,0.60)" }}>
                  VO 승인을 기다려주세요
                </p>
              </div>
            </div>
          )}
          {invResult === "error" && (
            <p className="text-[13px] px-1" style={{ color: "#E0433E" }}>
              초대 코드를 입력해주세요
            </p>
          )}

          {/* VDS Button XLarge Primary */}
          <button
            className="w-full h-14 rounded-xl text-[16px] font-medium text-white transition-all active:opacity-90"
            style={{ backgroundColor: "#0D6DD8" }}
            onClick={() => (invCode ? setInvResult("success") : setInvResult("error"))}
          >
            등록 신청
          </button>
        </div>
      </div>

      {/* Section Divider */}
      <div className="h-2 -mx-5 my-6" style={{ backgroundColor: "#EBEDEF" }} />

      {/* Section 2: 벤더장(VO) 등록 */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#ECF1F8" }}
          >
            <Building2 className="h-[18px] w-[18px]" style={{ color: "#1F3656" }} />
          </div>
          <div>
            <p className="text-[16px] font-bold" style={{ color: "#121417" }}>
              벤더장(VO) 등록
            </p>
            <p className="text-[13px]" style={{ color: "rgba(18,20,23,0.60)" }}>
              벤더 코드를 입력하여 벤더장으로 등록합니다
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* VDS TextField XLarge */}
          <div className="relative">
            <input
              type="text"
              placeholder="VC-2026-XXX"
              value={vcCode}
              onChange={(e) => {
                setVcCode(e.target.value);
                setVcResult("idle");
              }}
              onFocus={() => setVcFocused(true)}
              onBlur={() => setVcFocused(false)}
              className="w-full h-14 px-4 text-[16px] rounded-xl outline-none transition-all"
              style={{
                border: `1.5px solid ${
                  vcResult === "error"
                    ? "#E0433E"
                    : vcFocused
                    ? "#0D6DD8"
                    : "rgba(18,20,23,0.15)"
                }`,
                color: "#121417",
                backgroundColor: "#FFFFFF",
              }}
            />
            {vcCode && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(18,20,23,0.10)" }}
                onClick={() => setVcCode("")}
              >
                <X className="h-3 w-3" style={{ color: "rgba(18,20,23,0.60)" }} />
              </button>
            )}
          </div>

          {vcResult === "success" && (
            <div
              className="rounded-xl p-3.5 flex items-start gap-2.5"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#3EB21F" }} />
              <p className="text-[14px] font-medium" style={{ color: "#121417" }}>
                벤더장(VO) 등록 완료
              </p>
            </div>
          )}
          {vcResult === "error" && (
            <p className="text-[13px] px-1" style={{ color: "#E0433E" }}>
              벤더 코드를 입력해주세요
            </p>
          )}

          {/* VDS Button XLarge Tonal */}
          <button
            className="w-full h-14 rounded-xl text-[16px] font-medium transition-all active:opacity-90"
            style={{ backgroundColor: "#ECF1F8", color: "#073C78" }}
            onClick={() => (vcCode ? setVcResult("success") : setVcResult("error"))}
          >
            VO 등록
          </button>
        </div>
      </div>
    </div>
  );
}
