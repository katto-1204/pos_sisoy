(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/booking/booking-complete-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookingCompleteModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function BookingCompleteModal({ booking, clientName, accommodationName, checkIn, checkOut, nights, onClose }) {
    _s();
    const [isGeneratingPDF, setIsGeneratingPDF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const generatePDFReceipt = ()=>{
        setIsGeneratingPDF(true);
        try {
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            // Set colors
            const blueColor = [
                30,
                58,
                138
            ] // #1E3A8A
            ;
            const yellowColor = [
                250,
                204,
                21
            ] // #FACC15
            ;
            const grayColor = [
                50,
                50,
                50
            ];
            // Header with background
            doc.setFillColor(...blueColor);
            doc.rect(0, 0, pageWidth, 40, "F");
            doc.setTextColor(250, 204, 21);
            doc.setFontSize(28);
            doc.setFont("helvetica", "bold");
            doc.text("SISOY POS", pageWidth / 2, 20, {
                align: "center"
            });
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text("BOOKING RECEIPT", pageWidth / 2, 32, {
                align: "center"
            });
            // Receipt details
            let yPosition = 50;
            // Booking ID and Date
            doc.setTextColor(...grayColor);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Booking ID: ${booking.id}`, 20, yPosition);
            yPosition += 8;
            doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 20, yPosition);
            yPosition += 12;
            // Divider
            doc.setDrawColor(...blueColor);
            doc.line(20, yPosition, pageWidth - 20, yPosition);
            yPosition += 10;
            // Guest Information
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(...blueColor);
            doc.text("GUEST INFORMATION", 20, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(...grayColor);
            doc.text(`Name: ${clientName}`, 25, yPosition);
            yPosition += 6;
            doc.text(`Booking Date: ${new Date(booking.createdAt).toLocaleDateString()}`, 25, yPosition);
            yPosition += 12;
            // Accommodation Details
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(...blueColor);
            doc.text("ACCOMMODATION DETAILS", 20, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(...grayColor);
            doc.text(`Accommodation: ${accommodationName}`, 25, yPosition);
            yPosition += 6;
            doc.text(`Check-In: ${new Date(checkIn).toLocaleDateString()}`, 25, yPosition);
            yPosition += 6;
            doc.text(`Check-Out: ${new Date(checkOut).toLocaleDateString()}`, 25, yPosition);
            yPosition += 6;
            doc.text(`Number of Nights: ${nights}`, 25, yPosition);
            yPosition += 12;
            // Billing Summary
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(...blueColor);
            doc.text("BILLING SUMMARY", 20, yPosition);
            yPosition += 8;
            // Summary table
            const tableData = [
                [
                    "Description",
                    "Amount"
                ],
                [
                    `${accommodationName} x ${nights} nights`,
                    `₱${booking.totalAmount.toLocaleString()}`
                ],
                [
                    "Discount",
                    "₱0.00"
                ],
                [
                    "Service Charge",
                    "₱0.00"
                ],
                [
                    "Tax (0%)",
                    "₱0.00"
                ]
            ];
            doc.setFontSize(10);
            doc.setTextColor(...grayColor);
            tableData.forEach((row, index)=>{
                const isHeader = index === 0;
                if (isHeader) doc.setFont("helvetica", "bold");
                else doc.setFont("helvetica", "normal");
                doc.text(row[0], 25, yPosition);
                doc.text(row[1], pageWidth - 40, yPosition, {
                    align: "right"
                });
                yPosition += 6;
            });
            // Total
            yPosition += 2;
            doc.setDrawColor(...blueColor);
            doc.line(20, yPosition, pageWidth - 20, yPosition);
            yPosition += 6;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(...blueColor);
            doc.text("TOTAL AMOUNT", 25, yPosition);
            doc.text(`₱${booking.totalAmount.toLocaleString()}`, pageWidth - 40, yPosition, {
                align: "right"
            });
            yPosition += 14;
            // Payment Info
            doc.setDrawColor(...blueColor);
            doc.line(20, yPosition, pageWidth - 20, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(...blueColor);
            doc.text("PAYMENT INFORMATION", 20, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(...grayColor);
            doc.text(`Payment Status: PAID`, 25, yPosition);
            yPosition += 6;
            doc.text(`Transaction ID: ${booking.transactionId}`, 25, yPosition);
            yPosition += 12;
            // Footer
            doc.setDrawColor(...blueColor);
            doc.line(20, yPosition, pageWidth - 20, yPosition);
            yPosition += 8;
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text("Thank you for booking with Sisoy POS", pageWidth / 2, yPosition, {
                align: "center"
            });
            yPosition += 5;
            doc.text("For inquiries, please contact us", pageWidth / 2, yPosition, {
                align: "center"
            });
            // Save PDF
            doc.save(`Receipt_${booking.id}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate receipt. Please try again.");
        } finally{
            setIsGeneratingPDF(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-8 max-w-md w-full shadow-2xl space-y-6 animate-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-100 rounded-full p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-12 h-12 text-green-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M5 13l4 4L19 7"
                            }, void 0, false, {
                                fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                lineNumber: 197,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/booking/booking-complete-modal.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-blue-900 mb-2",
                            children: "Booking Complete!"
                        }, void 0, false, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 text-sm",
                            children: "Your reservation has been confirmed"
                        }, void 0, false, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-blue-50 rounded-lg p-4 space-y-3 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: "Booking ID"
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-gray-900",
                                    children: booking.id
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: "Room"
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-gray-900",
                                    children: accommodationName
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: "Nights"
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-gray-900",
                                    children: nights
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-blue-200 pt-3 mt-3 flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-gray-800",
                                    children: "Total Amount"
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-yellow-500 text-lg",
                                    children: [
                                        "₱",
                                        booking.totalAmount.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: generatePDFReceipt,
                            disabled: isGeneratingPDF,
                            className: "w-full py-3 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-6-4m6 4l6-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                isGeneratingPDF ? "Generating..." : "Download Receipt PDF"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-500 transition-colors",
                            children: "Done"
                        }, void 0, false, {
                            fileName: "[project]/components/booking/booking-complete-modal.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/booking/booking-complete-modal.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/booking/booking-complete-modal.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/booking/booking-complete-modal.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, this);
}
_s(BookingCompleteModal, "UT4UqgHQzYvdUHyg5AK1dkOn3tk=");
_c = BookingCompleteModal;
var _c;
__turbopack_context__.k.register(_c, "BookingCompleteModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(dashboard)/booking/payment/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$booking$2f$booking$2d$complete$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/booking/booking-complete-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PaymentPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const amount = Number.parseFloat(searchParams.get("amount") || "0");
    const bookingId = searchParams.get("bookingId") || "";
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("cash");
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [completedBooking, setCompletedBooking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSimulatePayment = async ()=>{
        setIsProcessing(true);
        // Simulate API call
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        const tempBooking = JSON.parse(sessionStorage.getItem("tempBooking") || "{}");
        const booking = {
            ...tempBooking,
            id: bookingId || tempBooking.id,
            status: "confirmed",
            paymentStatus: "paid",
            transactionId: `TXN${Date.now()}`
        };
        const API_BASE = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && ("TURBOPACK compile-time value", "http://localhost/pos-booking-system/backend/api") ? ("TURBOPACK compile-time value", "http://localhost/pos-booking-system/backend/api") : '';
        // Try to create booking on server first when API is configured
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && API_BASE) {
            try {
                // Ensure the customer exists on server. If the selected clientId is not a numeric DB id,
                // attempt to create the customer first and replace customer_id with the returned id.
                let customerIdToUse = booking.clientId;
                const isNumericId = /^[0-9]+$/.test(String(customerIdToUse));
                if (!isNumericId) {
                    const clientObj = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getClients().find((c)=>c.id === booking.clientId);
                    if (clientObj) {
                        try {
                            const createResp = await fetch(`${API_BASE}/customers.php?action=create`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    first_name: clientObj.firstName,
                                    last_name: clientObj.lastName,
                                    email: clientObj.email || '',
                                    phone: clientObj.phoneNumber || '',
                                    address: clientObj.address || ''
                                })
                            });
                            if (createResp.ok) {
                                const cjson = await createResp.json();
                                if (cjson && cjson.id) {
                                    customerIdToUse = String(cjson.id);
                                    // update local client id to server id so subsequent operations use server id
                                    try {
                                        const clients = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getClients();
                                        const idx = clients.findIndex((c)=>c.id === clientObj.id);
                                        if (idx !== -1) {
                                            clients[idx].id = customerIdToUse;
                                            localStorage.setItem('pos_clients', JSON.stringify(clients));
                                        }
                                    } catch  {}
                                }
                            }
                        } catch (e) {
                        // ignore and continue — booking will fallback to local if needed
                        }
                    }
                }
                const payload = {
                    customer_id: customerIdToUse,
                    accommodation_id: booking.accommodationId,
                    check_in: booking.dateFrom,
                    check_out: booking.dateTo,
                    guests: 1,
                    total_price: booking.totalAmount
                };
                const resp = await fetch(`${API_BASE}/bookings.php?action=create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                if (resp.ok) {
                    const json = await resp.json();
                    const serverId = json && json.id ? String(json.id) : booking.id;
                    const serverBooking = {
                        ...booking,
                        id: serverId
                    };
                    // ensure booking references the server customer id
                    serverBooking.clientId = customerIdToUse;
                    // write to local storage manually to avoid duplicate POST
                    try {
                        const existing = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getBookings() || [];
                        existing.push(serverBooking);
                        localStorage.setItem('pos_bookings', JSON.stringify(existing));
                    } catch  {}
                    sessionStorage.removeItem("tempBooking");
                    setIsProcessing(false);
                    setCompletedBooking(serverBooking);
                    return;
                }
            } catch (e) {
            // fall back to local-only if server call fails
            }
        }
        // Fallback local-only
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].addBooking(booking);
        sessionStorage.removeItem("tempBooking");
        setIsProcessing(false);
        setCompletedBooking(booking);
    };
    const handleCloseModal = ()=>{
        setCompletedBooking(null);
        router.push("/dashboard");
    };
    if (completedBooking) {
        const client = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getClients().find((c)=>c.id === completedBooking.clientId);
        const accommodation = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getAccommodations().find((a)=>a.id === completedBooking.accommodationId);
        const checkIn = new Date(completedBooking.dateFrom);
        const checkOut = new Date(completedBooking.dateTo);
        const nights = Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$booking$2f$booking$2d$complete$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            booking: completedBooking,
            clientName: client ? `${client.firstName} ${client.lastName}` : "Guest",
            accommodationName: accommodation?.name || "Accommodation",
            checkIn: completedBooking.dateFrom,
            checkOut: completedBooking.dateTo,
            nights: nights,
            onClose: handleCloseModal
        }, void 0, false, {
            fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-blue-900 mb-6 text-center",
                    children: "Confirm Payment"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-blue-50 p-6 rounded mb-6 text-center border border-blue-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mb-2 font-medium",
                            children: "Total Amount Due"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-4xl font-bold text-yellow-500",
                            children: [
                                "₱",
                                amount.toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-sm font-bold text-gray-700 mb-3",
                                children: "Payment Method"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: paymentMethod,
                                onChange: (e)=>setPaymentMethod(e.target.value),
                                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "cash",
                                        children: "Cash Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "gcash",
                                        children: "GCash"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "credit",
                                        children: "Credit Card"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "bank",
                                        children: "Bank Transfer"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSimulatePayment,
                    disabled: isProcessing,
                    className: "w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                    children: isProcessing ? "Processing Payment..." : "Confirm & Process Payment"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-xs text-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-bold mb-1 text-blue-900",
                            children: "Payment Confirmation"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Payment will be processed securely. A receipt will be generated upon completion."
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(dashboard)/booking/payment/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s(PaymentPage, "c7zgtERuLutAZe2abCjKeIDiyR0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = PaymentPage;
var _c;
__turbopack_context__.k.register(_c, "PaymentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_98c05fc1._.js.map