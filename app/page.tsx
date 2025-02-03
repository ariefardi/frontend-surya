import Image from "next/image";

const DATA = [
  {
    title: "Front Door Broken",
    status: "🙂 Non Urgent",
    isResolved: false,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "⚡ Urgent",
    isResolved: false,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "🔥 Emergency",
    isResolved: true,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "🔨 Less Urgent",
    isResolved: true,
    createdAt: new Date(),
  },
  {
    title: "Front Door Broken",
    status: "⚡ Urgent",
    isResolved: true,
    createdAt: new Date(),
  },
];
export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-[20px] font-bold">Maintenance Request</div>
      <div className="flex flex-shrink flex-row">
        <div className="bg-white w-[90px] h-[90px] rounded-[10px] shadow-md flex flex-col items-center">
          <div className="text-[36px] text-primary font-bold">2</div>
          <div className="text-[9px]">Open Requests</div>
        </div>
        <div className="mx-[20px] bg-white w-[90px] h-[90px] rounded-[10px] shadow-md flex flex-col items-center">
          <div className="text-[36px] text-primary font-bold">2</div>
          <div className="text-[9px]">Urgent Requests</div>
        </div>
        <div className="bg-white w-[90px] h-[90px] rounded-[10px] shadow-md flex flex-col items-center px-[6px]">
          <div className="text-[36px] text-primary font-bold">2</div>
          <div className="text-[9px] text-center">
            {" "}
            Average Time (days) to resolve
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[636px]">
        {DATA.map((d: any) => (
          <div className="bg-white flex flex-col w-full h-[87px] bg-white shadow-md mt-[20px] p-[16px] gap-[10px] rounded-[12px]">
            <div className="flex flex-row flex-1 justify-between">
              <div>{d.title}</div>
              <div>11 Dec 2024</div>
            </div>
            <div className="flex flex-row flex-1 justify-between">
              <div>{d.status}</div>
              {d?.isResolved ? (
                <div>{"Resolved"}</div>
              ) : (
                <div className="rounded-full bg-primary py-[3px] px-[8px] text-[12px] ">
                  <span className="text-[white] font-normal">
                    Mark as Resolved
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
