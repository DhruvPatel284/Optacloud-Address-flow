import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { SignupInput } from "../types"
import { Toaster, toast } from "react-hot-toast"
import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'
import { BACKEND_URL } from "../config/constants"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  })

  async function sendRequest() {
    try {
      toast.loading("Authentication in progress")
      const response = await axios.post(
        `${BACKEND_URL}/api/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      )
      if (!response) {
        toast.error("Error while logging in!")
      }
      toast.dismiss()
      toast.success("Logged In!")
      const jwt = response.data
      localStorage.setItem("token", jwt)
      navigate("/search")
    } catch (e) {
      toast.dismiss()
      toast.error("Error while logging in!")
    }
  }

  async function loginAsGuest() {
    try {
      toast.loading("Authentication in progress")
      const response = await axios.post(`${BACKEND_URL}/api/user/signin`, {
        username: "dhruv@gmail.com",
        password: "123456",
      })
      if (!response) {
        toast.error("Error while logging in!")
      }
      toast.dismiss()
      toast.success("Logged In!")
      const jwt = response.data
      localStorage.setItem("token", jwt)
      navigate("/search")
    } catch (e) {
      toast.dismiss()
      toast.error("Error while logging in!")
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      toast.loading("Google Authentication in progress")
      const response = await axios.post(`${BACKEND_URL}/api/user/google-auth`, {
        token: credentialResponse.credential,
      })
      if (!response) {
        toast.error("Error while logging in with Google!")
      }
      toast.dismiss()
      toast.success("Logged In with Google!")
      const jwt = response.data.token
      localStorage.setItem("token", jwt)
      navigate("/search")
    } catch (e) {
      toast.dismiss()
      toast.error("Error while logging in with Google!")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 m-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-2">
            {type === "signin" ? "Welcome Back" : "Join Us Today"}
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link
              className="ml-1 font-medium text-teal-600 hover:text-teal-500 transition-colors"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-teal-600 rounded-lg shadow-lg">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google sign-in failed")}
              useOneTap
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="John Doe"
              icon={<UserIcon className="h-5 w-5 text-gray-400" />}
              onChange={(e) => setPostInputs({
                ...postInputs,
                name: e.target.value,
              })}
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="john@example.com"
            icon={<MailIcon className="h-5 w-5 text-gray-400" />}
            onChange={(e) => setPostInputs({
              ...postInputs,
              username: e.target.value,
            })}
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<LockIcon className="h-5 w-5 text-gray-400" />}
            onChange={(e) => setPostInputs({
              ...postInputs,
              password: e.target.value,
            })}
          />

          <button
            onClick={sendRequest}
            className="w-full text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-300 ease-in-out"
          >
            {type === "signup" ? "Create Account" : "Sign In"}
          </button>

          <button
            onClick={loginAsGuest}
            className="w-full text-teal-600 bg-white border-2 border-teal-600 hover:bg-teal-50 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-300 ease-in-out"
          >
            Continue as Guest
          </button>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

interface LabelledInputType {
  label: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  icon?: React.ReactNode
}

function LabelledInput({ label, placeholder, onChange, type, icon }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          onChange={onChange}
          type={type || "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2.5 transition-all duration-300 ease-in-out"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  )
}