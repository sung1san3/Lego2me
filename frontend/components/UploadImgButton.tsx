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
import "react-image-crop/dist/ReactCrop.css";

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
  const sxBox: SxProps<Theme> = (theme: Theme) => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  };
  //FIXME:
  const setFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const fd = new FormData();
      const upload_file = e.target.files[0];
      console.log(upload_file);
      fd.append("img_top", upload_file);
      //fd.append("img_bottom", upload_file);
      fd.append("img_title", upload_file.name);

      axios
        .post("http://localhost:8001/api/posts/", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("success");
          axios.get("http://localhost:8001/movies/5").then((res) => {
            const imgPathTop = "/items/top/";
            const imgPathBottom = "/items/bottom/";

            const objTop = res.data.top;
            const objBottom = res.data.bottom;

            const resultTop = "".concat(imgPathTop, objTop, ".png");
            const resultBottom = "".concat(imgPathBottom, objBottom, ".png");

            console.log(resultTop);
            console.log(resultBottom);

            if (
              hairStateValue !== "/items/default.png" ||
              topStateValue !== "/items/default.png" ||
              bottomStateValue !== "/items/default.png"
            ) {
              resetHair();
              resetTop();
              resetBottom();
            }
            setTopUseSetRecoilState(`${resultTop}`);
            setBottomUseSetRecoilState(`${resultBottom}`);
            router.push("/result");
          });
        })
        .catch((err) => {
          console.log(err);
          handleClose();
          window.alert("try again");
        });
    }
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

  function generateDownload(
    canvas: {
      toBlob: (arg0: (blob: any) => void, arg1: string, arg2: number) => void;
    },
    crop: any
  ) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob: Blob | MediaSource) => {
        const previewUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.download = "cropPreview.png";
        anchor.href = URL.createObjectURL(blob);
        anchor.click();

        window.URL.revokeObjectURL(previewUrl);
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
          <div className="App">
            <div>
              <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
              <canvas
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0),
                }}
              />
            </div>
            <p>test</p>
            <button
              type="button"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() =>
                generateDownload(previewCanvasRef.current, completedCrop)
              }
            >
              Download cropped image
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadImgButton;
