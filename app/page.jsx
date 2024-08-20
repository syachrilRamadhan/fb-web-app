"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
const Home = () => {
  const akiKering = {
    title: "Daftar Aki Kering",
    description: "I have experienced many different jobs, before finally switch my career to become a software developer and entering the technology industry.",
    items: [
      {
        id: 1,
        name: "Aki GS MF NS 60",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "900000",
      },
      {
        id: 2,
        name: "Aki GS MF NS 40Z",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "750000",
      },
      {
        id: 3,
        name: "Aki GS MF NS 40",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "700000",
      },
    ],
  };

  const akiBasah = {
    title: "List Aki Basah",
    description: "I have experienced many different jobs, before finally switch my career to become a software developer and entering the technology industry.",
    items: [
      {
        id: 1,
        name: "Aki GS Hybrid NS 60",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "850000",
      },
      {
        id: 2,
        name: "Aki GS Hybrid NS 40Z",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "750000",
      },
      {
        id: 3,
        name: "Aki Incoe Gold NS 60",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "650000",
      },
    ],
  };

  const akiMotor = {
    title: "List Aki Motor",
    description: "I have experienced many different jobs, before finally switch my career to become a software developer and entering the technology industry.",
    items: [
      {
        id: 1,
        name: "GS GTZ5S",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "250000",
      },
      {
        id: 2,
        name: "GS GTZ6V",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "350000",
      },
      {
        id: 3,
        name: "YTZ7V",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, error.",
        price: "400000",
      },
    ],
  };

  // const [product, setProduct] = useState(products[0]);

  // const handleSlideChange = (swiper) => {
  //   const curIndex = swiper.activeIndex;
  //   setProduct(products[curIndex]);
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="akiKerring" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="akiKering">Aki Kering</TabsTrigger>
            <TabsTrigger value="akiBasah">Aki Basah</TabsTrigger>
            <TabsTrigger value="akiMotor">Aki Motor</TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full">
            <TabsContent value="akiKering" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-semibold">{akiKering.title}</h3>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {akiKering.items.map((item, index) => {
                      return (
                        <li key={index} className="bg-sky-800 h-[300px] rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                          <Image src="/public/ns60mf.jpeg" alt="" width={130} height={130}/>
                          <span className="text-sky-600">{item.name}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.description}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-sky-600"></span>
                            <p className="text-sky-600">Rp.{item.price}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="akiBasah" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{akiBasah.title}</h3>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {akiBasah.items.map((item, index) => {
                      return (
                        <li key={index} className="bg-[#232329] h-[185px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                          <span className="text-accent">{item.name}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.description}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.price}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="akiMotor" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center lg:text-left">
                  <h3 className="text-4xl font-bold">{akiMotor.title}</h3>
                  {/* <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p> */}
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {akiMotor.items.map((item, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">{item.name}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.price}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Home;
