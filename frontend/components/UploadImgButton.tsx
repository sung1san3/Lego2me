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
      bgcolor: "background.paper",
      width: 700,
      boxShadow: 1,
      borderRadius: 2,
      p: 2,
    };
  };

  //사진 저장 기능
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 40,
    aspect: 1 / 1,
  });
  // 자른 이미지 상태 저장
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [topBlob, setTopBlob] = useState<File | null>(null);
  const [bottomBlob, setBottomBlob] = useState<File | null>(null);
  const [uploadImgName, setUploadImgName] = useState<any>(null);

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
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(file);

      const lastDot = file.name.lastIndexOf(".");
      const fileName = file.name.substring(-1, lastDot).concat(".png");
      setUploadImgName(fileName);
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

  const handleResult = () => {
    const fd = new FormData();
    if (topBlob !== null && bottomBlob !== null) {
      fd.append("img_top", topBlob);
      //fd.append("img_top_title", topBlob.name);
      fd.append("img_bottoms", bottomBlob);
      //fd.append("img_bottom_title", bottomBlob.name);
      fd.append("img_title", uploadImgName);
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
            <div className="flex justify-center mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-red-50 file:text-red-500
      hover:file:bg-red-100
      font-Montserrat
    "
              />
            </div>
            <div className="flex justify-around items-center align-middle">
              <ReactCrop
                className="rounded-xl w-100 bg-none"
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
              <div>
                <canvas
                  className=" p-1 rounded-xl"
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </div>
            </div>

            <div className="flex justify-around mt-4 font-Montserrat">
              <button
                className="bg-transparent rounded-full hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent"
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  generateTopImage(previewCanvasRef.current, completedCrop)
                }
              >
                1. Select Top
              </button>
              <button
                className="bg-transparent rounded-full hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent font-Montserrat"
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  generateBottomImage(previewCanvasRef.current, completedCrop)
                }
              >
                2. Select Bottom
              </button>
              {/* FIXME: */}
              <button
                className="bg-transparent rounded-full hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent font-Montserrat "
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={handleResult}
              >
                3. Check your character
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadImgButton;
