"use client"

import React from "react"
import { Search, Trash2, Archive, Clock, Users, ShoppingBag, Bell, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function DashboardPreview() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex border-b border-zinc-200 dark:border-zinc-700">
          <div className="w-64 bg-zinc-100 dark:bg-zinc-900 p-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 mr-2"></div>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Alicia Koch</span>
            </div>
            <nav>
              <ul className="space-y-2">
                <li className="flex items-center text-zinc-900 dark:text-zinc-100 font-medium">
                  <Trash2 className="w-5 h-5 mr-2" /> Inbox <span className="ml-auto">128</span>
                </li>
                <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                  <Archive className="w-5 h-5 mr-2" /> Drafts <span className="ml-auto">9</span>
                </li>
                <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                  <Clock className="w-5 h-5 mr-2" /> Sent
                </li>
                <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                  <Users className="w-5 h-5 mr-2" /> Junk <span className="ml-auto">23</span>
                </li>
                <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                  <ShoppingBag className="w-5 h-5 mr-2" /> Trash
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Inbox</h2>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-zinc-600 dark:text-zinc-400">
                  All mail
                </Button>
                <Button size="sm" variant="ghost" className="text-zinc-600 dark:text-zinc-400">
                  Unread
                </Button>
                <Button size="sm" variant="ghost" className="text-zinc-600 dark:text-zinc-400">
                  <Trash2 className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-zinc-600 dark:text-zinc-400">
                  <Clock className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-zinc-600 dark:text-zinc-400">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 w-full bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                />
              </div>
              <div className="space-y-4">
                <EmailPreview
                  sender="William Smith"
                  subject="Meeting Tomorrow"
                  preview="Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project..."
                  time="4 months ago"
                  tags={["meeting", "work", "important"]}
                />
                <EmailPreview
                  sender="Alice Smith"
                  subject="Re: Project Update"
                  preview="Thank you for the project update. It looks great! I've gone through the report, and the..."
                  time="4 months ago"
                  tags={["work", "important"]}
                />
                <EmailPreview
                  sender="Bob Johnson"
                  subject="Weekend Plans"
                  preview="Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's..."
                  time="10 months ago"
                  tags={["personal"]}
                />
              </div>
            </div>
          </div>
          <div className="w-1/3 border-l border-zinc-200 dark:border-zinc-700 p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">William Smith</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Meeting Tomorrow</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">Reply-To: williamsmith@example.com</p>
            </div>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.</p>
              <p>Please come prepared with any questions or insights you may have. Looking forward to our meeting!</p>
              <p>Best regards, William</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailPreview({ sender, subject, preview, time, tags }) {
  return (
    <div className="flex items-center p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded">
      <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-600 mr-3"></div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-zinc-800 dark:text-zinc-200">{sender}</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{time}</span>
        </div>
        <p className="font-medium text-zinc-700 dark:text-zinc-300">{subject}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{preview}</p>
        <div className="flex mt-1 space-x-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview