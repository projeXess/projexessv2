/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { Input, Checkbox, Select } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addProject } from '@/redux/slices/projectSlice';


const { TextArea } = Input;

function Index() {
    const { user } = useSelector((state: RootState) => state.userReducer)
    const [tags, setTags] = React.useState<any[]>([

    ])

    function handleKeyDown(e: any) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }
    function removeTag(index: number) {
        setTags(tags.filter((_el, i) => i !== index))
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        projectSizeRange: '',
        projectDeadline: '',
        projectSector: '',
        projectMembers: [],
        projectOwner: user?.email
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(addProject({ ...formData, projectMembers: tags }))
        navigate('/dashboard')
    }

    useEffect(() => {
        const handleRedirect = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault()
            }
        }
        window.addEventListener('keydown', e => handleRedirect(e))
        return () => window.removeEventListener('keydown', e => handleRedirect(e))

    }, [])

    return (
        <div className="w-full grid place-content-center h-full text-left p-4">
            <h1 className="text-[#040308] text-[1.5rem] font-bold">Project</h1>
            <p className="text-[0.75rem] mt-5">Enter all required information about your project and team <br /> that you want to start with in our system</p>


            <form className="flex flex-col gap-5 mt-10 p-2" onSubmit={(e) => e.preventDefault()}>
                <div className="input__container">
                    <Input
                        name='projectName'
                        value={formData.projectName}
                        onChange={handleChange}
                        placeholder="Project Name"
                    />
                </div>

                <div className="input__container">
                    <Select
                        onChange={(e) => setFormData(prev => ({ ...prev, projectSector: e }))}
                        className="w-full"
                        placeholder="Select project sector"
                    >

                        <Select.Option value="Agriculture">Agriculture</Select.Option>
                        <Select.Option value="Education">Education</Select.Option>
                        <Select.Option value="Industry">Industry</Select.Option>
                        <Select.Option value="Transport">Transport</Select.Option>
                        <Select.Option value="Trade and Commerce">Trade and Commerce</Select.Option>
                    </Select>
                </div>

                <div className="input__container">
                    <Select
                        onChange={(e) => setFormData(prev => ({ ...prev, projectSizeRange: e }))}
                        className="w-full"
                        placeholder="Select size range"
                    >
                        <Select.Option value="0-5">0 - 5</Select.Option>
                        <Select.Option value="5-15">5 - 15</Select.Option>
                        <Select.Option value="15-30">15 - 30</Select.Option>
                        <Select.Option value="30-100">30 - 100</Select.Option>
                        <Select.Option value="100+">100 +</Select.Option>
                    </Select>
                </div>


                <div className="input__container">
                    <div className="tags-input-container">
                        {tags.map((tag, index) => (
                            <div className="tag-item" key={index}>
                                <span className="text">{tag}</span>
                                <span className="close" onClick={() => removeTag(index)}>&times;</span>
                            </div>
                        ))}
                        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Invite members by email. Place enter for inserting others" />
                    </div>
                </div>

                <div className="input__container">
                    <Select
                        onChange={(e) => setFormData(prev => ({ ...prev, projectDeadline: e }))}
                        className="w-full"
                        placeholder="Select deadline of the project"
                    >

                        <Select.Option value="1-3 months">1 - 3 months</Select.Option>
                        <Select.Option value="4-8 months">4 - 8 months</Select.Option>
                        <Select.Option value="9-12 months">9 - 12 months</Select.Option>
                        <Select.Option value="1-2 years">1 - 2 years</Select.Option>
                        <Select.Option value="1-2 years">2 - 4 years</Select.Option>
                    </Select>
                </div>

                <div className="input__container">
                    <TextArea
                        name='projectDescription'
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Project Description"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </div>


                <div className="flex gap-3 items-center">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-[.8rem]">I agree to Projexess <Link to={"/"} className="text-blue-500">Terms of Services</Link> and <Link to={"/"} className="text-blue-500">Privacy policy</Link></label>
                </div>

                <div>
                    <Link to={"/dashboard"}>
                        <button className="btn-filled w-full p-2 outline-none mt-5" onClick={(e) => handleSubmit(e)}>Create Project</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Index