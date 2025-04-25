import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

const images = [
  "https://placehold.co/800x600/EEE/31343C?text=AI+Design&font=Montserrat",
  "https://placehold.co/800x600/EEE/31343C?text=Future+Tech&font=Montserrat",
  "https://placehold.co/800x600/EEE/31343C?text=Innovation&font=Montserrat",
  "https://placehold.co/800x600/EEE/31343C?text=AI+Powered&font=Montserrat",
];

const headlines = [
  "Revolutionize Your Workflow with AI",
  "The Future of Design is Here",
  "Unleash Your Creativity with AI",
  "Create Stunning Designs in Seconds",
];

const subheadlines = [
  "Experience the power of AI to automate your design process.",
  "Discover the next generation of design tools.",
  "Generate unique and creative designs with ease.",
  "Transform your ideas into reality with AI.",
];

const Button = ({ variant, size, className, children, onClick }) => {
  let baseClassName =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";

  if (variant === "default") {
    baseClassName += " bg-purple-500 text-white hover:bg-purple-600";
  } else if (variant === "destructive") {
    baseClassName += " bg-red-500 text-white hover:bg-red-600";
  } else if (variant === "outline") {
    baseClassName +=
      " border border-gray-300 bg-white text-gray-900 hover:bg-gray-100";
  } else if (variant === "secondary") {
    baseClassName += " bg-gray-200 text-gray-900 hover:bg-gray-300";
  } else if (variant === "ghost") {
    baseClassName += " text-gray-900 hover:bg-gray-100";
  }

  if (size === "sm") {
    baseClassName += " px-2.5 py-1.5 text-sm";
  } else if (size === "lg") {
    baseClassName += " px-5 py-3 text-base";
  } else if (size === "icon") {
    baseClassName += " h-9 w-9 p-0";
  } else {
    baseClassName += " px-4 py-2 text-base";
  }

  return (
    <button onClick={onClick} className={`${baseClassName} ${className}`}>
      {children}
    </button>
  );
};

const HeroSection = () => {
  const [headline, setHeadline] = useState(headlines[0]);
  const [subheadline, setSubheadline] = useState(subheadlines[0]);
  const [image, setImage] = useState(images[0]);
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [isEditingSubheadline, setIsEditingSubheadline] = useState(false);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const [shouldShift, setShouldShift] = useState(false);

  const handleRegenerate = () => {
    setHeadline(headlines[Math.floor(Math.random() * headlines.length)]);
    setSubheadline(
      subheadlines[Math.floor(Math.random() * subheadlines.length)]
    );
    setImage(images[Math.floor(Math.random() * images.length)]);
  };

  const EditableText = ({
    text,
    isEditing,
    onSave,
    onEdit,
    placeholder,
    className,
    inputClassName,
    editRef,
  }) => {
    const [value, setValue] = useState(text);

    useEffect(() => {
      setValue(text);
    }, [text]);

    useEffect(() => {
      if (isEditing && editRef?.current) {
        editRef.current.focus();
      }
    }, [isEditing, editRef]);

    const handleBlur = () => {
      onSave(value);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleBlur();
      } else if (e.key === "Escape") {
        setValue(text);
        onEdit(false);
      }
    };

    return isEditing ? (
      <input
        ref={editRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        placeholder={placeholder}
      />
    ) : (
      <div className="flex items-center gap-2">
        <span onClick={onEdit} className={className}>
          {text || placeholder}
        </span>
      </div>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldShift((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {}
      <img
        src={image}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {}
      <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto p-4">
        {}
        <EditableText
          text={headline}
          isEditing={isEditingHeadline}
          onEdit={() => setIsEditingHeadline(true)}
          onSave={(newText) => {
            setHeadline(newText);
            setIsEditingHeadline(false);
          }}
          placeholder="Enter Headline"
          className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text cursor-pointer select-none"
          inputClassName="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center bg-black/50 backdrop-blur-md rounded-lg p-2 w-full"
          editRef={headlineRef}
        />

        {}
        <AnimatePresence mode="wait">
          <motion.div
            key={subheadline}
            initial={{ x: shouldShift ? -20 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: shouldShift ? 20 : 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 cursor-pointer select-none"
            onClick={() => setIsEditingSubheadline(true)}
          >
            {isEditingSubheadline ? (
              <input
                ref={subheadlineRef}
                value={subheadline}
                onChange={(e) => {
                  setSubheadline(e.target.value);
                  setIsEditingSubheadline(false);
                }}
                onBlur={() => setIsEditingSubheadline(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditingSubheadline(false);
                  }
                }}
                className="text-lg sm:text-xl md:text-2xl text-white text-center bg-black/50 backdrop-blur-md rounded-lg p-2 w-full"
                autoFocus
              />
            ) : (
              subheadline
            )}
          </motion.div>
        </AnimatePresence>

        {}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Launch App
          </Button>
        </motion.div>

        {}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          className="bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Regenerate with AI
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
