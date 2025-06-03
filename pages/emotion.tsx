import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { motion } from 'framer-motion';

export default function EmotionDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector`),
        faceapi.nets.faceExpressionNet.loadFromUri(`${MODEL_URL}/face_expression`)
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Error accessing webcam: ', err));
    };

    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);
        const resized = faceapi.resizeResults(detections, displaySize);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resized);
          faceapi.draw.drawFaceExpressions(canvas, resized);
        }

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const expressionEntries = Object.entries(expressions) as [keyof typeof expressions, number][];
<<<<<<< HEAD
          const maxExpression = expressionEntries.reduce((prev, curr) =>
            curr[1] > prev[1] ? curr : prev
          )[0];
=======
const maxExpression = expressionEntries.reduce((prev, curr) =>
  curr[1] > prev[1] ? curr : prev
)[0];
>>>>>>> 62fa5072d3a427beebc99d520f0985129433f2e1

          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          if (userData.email) {
            await fetch('/api/emotions/save', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userData.email,
                emotion: maxExpression,
              }),
            }).catch((err) => console.error('Error saving emotion:', err));
          }
        }
      }
    }, 3000); // Save every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white rounded-t-3xl pt-8 pb-10 px-6 sm:px-10 w-full max-w-3xl shadow-xl flex flex-col items-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-black">
          Real-Time Emotion Detection
        </h1>
        <div className="relative w-full max-w-4xl aspect-video rounded-xl border border-gray-300 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
