import { SplitStage } from "@/components/split-stage";
import { Close } from "@/components/close";
import { StageController } from "@/components/stage-controller";

export default function Home() {
  return (
    <main id="trang">
      <SplitStage />
      <Close />
      <StageController />
    </main>
  );
}
