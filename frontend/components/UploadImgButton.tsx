import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";

import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled, SxProps, Theme } from "@mui/material/styles";
import axios from "axios";
import FormData from "form-data";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";
import ReactCrop from "react-image-crop";

const UploadImgButton: React.FC = () => {
  const router = useRouter();

  // 구독하는 아톰의 값만 반환한다.
  const hairStateValue = useRecoilValue(hairState);
  const topStateValue = useRecoilValue(topState);
  const bottomStateValue = useRecoilValue(bottomState);

  // 값을 변경하는 함수만 반환
  const setTopUseSetRecoilState = useSetRecoilState(topState);
  const setBottomUseSetRecoilState = useSetRecoilState(bottomState);

  // 설정된 기본값으로 리셋
  const resetHair = useResetRecoilState(hairState);
  const resetTop = useResetRecoilState(topState);
  const resetBottom = useResetRecoilState(bottomState);

  //모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Input = styled("input")({
    display: "none",
  });
  //모달 스타일
  const sxBox: SxProps<Theme> = (theme: Theme) => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  };

  //사진 저장 기능
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 30,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [topBlob, setTopBlob] = useState<File | null>(null);
  const [bottomBlob, setBottomBlob] = useState<File | null>(null);

  //FIXME: axios 통신
  // const setFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files instanceof FileList) {
  //     const fd = new FormData();
  //     const upload_file = e.target.files[0];
  //     console.log(upload_file);
  //     fd.append("img_top", upload_file);
  //     //fd.append("img_bottom", upload_file);
  //     fd.append("img_title", upload_file.name);

  //     axios
  //       .post("http://localhost:8001/api/posts/", fd, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((res) => {
  //         console.log("success");
  //         axios.get("http://localhost:8001/movies/5").then((res) => {
  //           const imgPathTop = "/items/top/";
  //           const imgPathBottom = "/items/bottom/";

  //           const objTop = res.data.top;
  //           const objBottom = res.data.bottom;

  //           const resultTop = "".concat(imgPathTop, objTop, ".png");
  //           const resultBottom = "".concat(imgPathBottom, objBottom, ".png");

  //           console.log(resultTop);
  //           console.log(resultBottom);

  //           if (
  //             hairStateValue !== "/items/default.png" ||
  //             topStateValue !== "/items/default.png" ||
  //             bottomStateValue !== "/items/default.png"
  //           ) {
  //             resetHair();
  //             resetTop();
  //             resetBottom();
  //           }
  //           setTopUseSetRecoilState(`${resultTop}`);
  //           setBottomUseSetRecoilState(`${resultBottom}`);
  //           router.push("/result");
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         handleClose();
  //         window.alert("try again");
  //       });
  //   }
  // };
  //상의 결과 저장
  function generateTopImage(
    canvas: {
      toBlob: (arg0: (blob: any) => void, arg1: string, arg2: number) => void;
    },
    crop: any
  ) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob: Blob) => {
        const topFile = new File([blob], "image_top.png", { type: blob.type });
        setTopBlob(topFile);
        console.log(topBlob);
      },
      "image/png",
      1
    );
  }
  //하의 결과 저장
  function generateBottomImage(
    canvas: {
      toBlob: (arg0: (blob: any) => void, arg1: string, arg2: number) => void;
    },
    crop: any
  ) {
    if (!crop || !canvas) {
      return;
    }
    canvas.toBlob(
      (blob: Blob) => {
        const bottomFile = new File([blob], "image_bottom.png", {
          type: blob.type,
        });
        setBottomBlob(bottomFile);
        console.log(bottomBlob);
      },
      "image/png",
      1
    );
  }

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  //FIXME:결과값 데이터 전송
  const handleResult = () => {
    const fd = new FormData();
    if (topBlob !== null && bottomBlob !== null) {
      fd.append("img_top", topBlob);
      fd.append("img_top_title", topBlob.name);

      fd.append("img_bottom", bottomBlob);
      fd.append("img_bottom_title", bottomBlob.name);

      axios
        .post("http://localhost:8001/api/posts/", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
          handleClose();
          window.alert("try again");
        });
    }
  };

  return (
    <div>
      <Button
        component="span"
        variant="contained"
        color="error"
        onClick={handleOpen}
      >
        Get Started
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sxBox}>
          <div>
            <div className="flex justify-center ">
              <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            <div className="flex justify-items-center">
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                maxWidth={300}
              />
              <div className="items-center">
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </div>
            </div>
            <div className="flex justify-around">
              <button
                className="border-2 border-black"
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  generateTopImage(previewCanvasRef.current, completedCrop)
                }
              >
                Save Top
              </button>
              <button
                className="border-2 border-black"
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  generateBottomImage(previewCanvasRef.current, completedCrop)
                }
              >
                Save Bottom
              </button>
              {/* FIXME: */}
              <button
                className="border-2 border-black"
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={handleResult}
              >
                View results
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadImgButton;
