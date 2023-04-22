"use client";

import type { RootState } from "@/store";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
	decrement,
	increment,
	incrementByAmount,
} from "@/features/counter/counterSlice";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function Page() {
	const count = useAppSelector((state: RootState) => state.counter.value);
	const dispatch = useAppDispatch();

	const [value, setValue] = useState<string>("0");
	const handleIncrementByValue = (inputValue: string) => {
		let value = parseInt(inputValue);
		dispatch(incrementByAmount(value));
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}

		let storeNum = localStorage.setItem("storeNum", count.toString());
	}, [count]);

	let getNum = () => localStorage.getItem("storeNum");
	let numCount = Number(getNum());

	return (
		<div>
			<div>
				<button
					className="btn-blue"
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
				>
					Increment
				</button>
				<span className="mx-4 inline-block w-4 h-4">{numCount}</span>
				<button
					className="btn-blue"
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
			</div>
			<div className="mt-10">
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="mr-2 h-10 rounded"
					ref={inputRef}
				/>
				<button
					className="btn-blue"
					onClick={() => handleIncrementByValue(value)}
				>
					Add By Value
				</button>
			</div>
		</div>
	);
}
