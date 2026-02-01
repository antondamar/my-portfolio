import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AnimatedImage from '../AnimatedImage';
import { educationData } from '../../data/about-data/education-data'

export default function EducationDetail() {
  const { educationLevel } = useParams();
  const navigate = useNavigate();

	const activeSection = educationLevel;

  // 1. Get the data based on the URL
  const dataKey = Object.keys(educationData).find(
    k => k.toLowerCase() === educationLevel?.toLowerCase()
  );
  const currentData = educationData[dataKey];

  // 2. Local state for the "You are a/an" selector
  const [selectedStyle, setSelectedStyle] = useState("Indonesian");

  // Safety check: if URL is wrong, go back
  if (!currentData) return null;

	return (
		<motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="pt-7">
			<button 
				onClick={() => {
					navigate('/about');
				}}
				className="relative z-[9999] flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group cursor-pointer"
			>
				<ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
				<span className="text-[10px] font-bold uppercase tracking-widest font-sans">Back to About</span>
			</button>
			<div className="flex flex-col lg:flex-row gap-16">
				<div className="w-full lg:w-3/5">
					{/* 1. YEAR (Top) */}
					<span className="text-zinc-600 text-s font-bold uppercase tracking-widest mb-4 block">
						{currentData.years}
					</span>

					<div className={`flex items-center mt-10 mb-10 ${activeSection === 'Undergrad' ? 'gap-36' : 'gap-32'}`}>
						<div className="w-[80px] md:w-[90px] flex justify-center shrink-0">
							{currentData.logo && (
								<img
									src={currentData.logo}
									style={{ transform: `scale(${currentData.scale || 1}) translateX(20px)` }}
								/>
							)}
						</div>

						{/* 2. TITLE (Will now stay perfectly still) */}
						<h2 className="text-4xl md:text-5xl ml-10 font-extrabold tracking-tighter text-white uppercase italic leading-none">
							{currentData.title}
						</h2>
						
					</div>
					<div className="w-full">
						<div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-8">
							
							{/* Style Selector Dropdown */}
							<div className="flex items-center gap-3">
								<span className="text-zinc-500 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">You are a/an:</span>
								<select 
									value={selectedStyle}
									onChange={(e) => setSelectedStyle(e.target.value)}
									className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg focus:outline-none focus:border-zinc-500 cursor-pointer transition-colors"
								>
									<option value="English speaker">English Speaker</option>
									<option value="Indonesian">Indonesian</option>
								</select>
							</div>
						</div>

						{/* Animated Essay Container */}
						<div className="text-zinc-400 text-[19px] italic text-justify leading-relaxed font-medium border-l border-zinc-800 pl-6 min-h-[250px]">
							<AnimatePresence mode="wait">
								<motion.div
									key={selectedStyle}
									initial={{ opacity: 0, x: 10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{ duration: 0.3 }}
									className="space-y-6"
								>
									{currentData.description[selectedStyle] && currentData.description[selectedStyle].length > 0 
										? currentData.description[selectedStyle] 
										: currentData.description["English speaker"]}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
				<div className="w-full lg:w-2/5 grid grid-cols-2 gap-4 auto-rows-min">
					{currentData.images.map((img, i) => (
						<div 
							key={i} 
							className={`rounded-xl overflow-hidden border border-zinc-800 shadow-xl 
							${i % 3 === 0 ? 'col-span-2 aspect-[2.5/2]' : 'aspect-[4/5]'}
							${i % 2 === 0 ? 'mt-8' : 'mt-0'}`}
						>
							<AnimatedImage
								src={img}
								alt="Education"
								containerClassName="w-full h-full"
								className="w-full h-full object-cover"
							/>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	)
}